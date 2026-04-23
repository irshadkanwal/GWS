import { ROUTES } from "@/constants/routes";
import db from "@/models";
import { EmailRequestTemplate } from "@/utilities/helpers/emailRequestsTemplate";
import { sendEmail } from "@/utilities/helpers/emailService";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { stripe } from "@/lib/stripe";
import { USER_ROLES } from "@/constants/constants";

const loginUser = async (credentials) => {
  try {
    const BASE_URL = process.env.NEXT_PUBLIC_URL;
    const JWT_SECRET = process.env.JWT_SECRET || "";

    let user = null;
    let loginPassword = null;
    let actualRoleId = null;
    let actualEmail = credentials.email.toLowerCase();
    let isCareGiverLogin = false;

    // 1. Try login as user (Recipient or other role)
    user = await db.users.findOne({
      where: { email: actualEmail },
      include: [
        { model: db.userDetails, as: "userDetails" },
        { model: db.giftWell, as: "giftWell" },
        { model: db.roles, as: "roles" },
      ],
    });

    // 2. If not found in users, try caregiver
    if (!user) {
      const careGiver = await db.careGiver.findOne({
        where: { email: actualEmail },
      });

      if (!careGiver) {
        throw new Error("No user found");
      }

      // caregiver-specific check
      if (!careGiver.is_verified) {
        const token = jwt.sign({ email: careGiver.email }, JWT_SECRET, {
          expiresIn: "15m",
        });
        const verifyUrl = `${BASE_URL}/verify?token=${token}`;

        await sendEmail(
          careGiver.email,
          "Email Address Verification",
          EmailRequestTemplate(
            verifyUrl,
            "Verify Your Email",
            "Click the button below to verify your email and activate your account.",
            "Verify Email"
          )
        );

        throw new Error(
          "Email not verified. We've sent a new verification email."
        );
      }

      isCareGiverLogin = true;
      loginPassword = careGiver.password;
      actualRoleId = careGiver.role_id;

      // fetch recipient user associated with careGiver
      user = await db.users.findOne({
        where: { id: careGiver.user_id },
        include: [
          { model: db.userDetails, as: "userDetails" },
          { model: db.giftWell, as: "giftWell" },
          { model: db.roles, as: "roles" },
        ],
      });

      if (!user) {
        throw new Error("Linked recipient not found for care giver");
      }
    } else {
      loginPassword = user.password;
      actualRoleId = user.role_id;
    }

    if (user.is_deleted) {
      throw new Error(
        "Your account has been deactivated. Please contact support for assistance."
      );
    }

    const isPasswordValid = await bcrypt.compare(
      credentials.password,
      loginPassword
    );
    if (!isPasswordValid) {
      throw new Error("Invalid username or password");
    }

    // if user login (not caregiver) and not verified
    if (!isCareGiverLogin && !user.is_verified) {
      const token = jwt.sign({ email: user.email }, JWT_SECRET, {
        expiresIn: "15m",
      });
      const verifyUrl = `${BASE_URL}/verify?token=${token}`;

      await sendEmail(
        user.email,
        "Email Address Verification",
        EmailRequestTemplate(
          verifyUrl,
          "Verify Your Email",
          "Click the button below to verify your email and activate your account.",
          "Verify Email"
        )
      );

      throw new Error(
        "Email not verified. We've sent a new verification email."
      );
    }

    const recipientRole = await db.roles.findOne({
      where: { id: user.role_id },
    });
    const isRecipient = recipientRole.name === USER_ROLES.RECIPIENT;

    // 🟢 Create Stripe account if recipient and missing one
    if (!isCareGiverLogin && !user.stripe_account_id && isRecipient) {
      const account = await stripe.accounts.create({
        type: "express",
        email: user.email,
        capabilities: {
          transfers: { requested: true },
          card_payments: { requested: true },
        },
      });

      await user.update({ stripe_account_id: account.id });
    }

    const registryItems = await db.registryItem.findAll({
      where: { giftwell_id: user.giftWell.id },
    });

    const isPersonalDetailsCompleted = Boolean(
      user.userDetails?.journey &&
        user.userDetails?.street_address &&
        user.userDetails?.city &&
        user.userDetails?.state &&
        user.userDetails?.zip_code
    );

    const isRegistryPublished = user.giftWell?.privacy === "public";
    const isRegistrySetupCompleted = !!registryItems?.length;

    const getUserRoutePermissions = () => {
      const allowedPaths = Object.values(ROUTES).filter((value) =>
        value.allowedRoles.includes(user.roles.name)
      );
      return allowedPaths.reduce(
        (acc, curr) => ({ ...acc, [curr.pathName]: true }),
        {}
      );
    };

    // destructure and override only the required fields
    const {
      password,
      email: _ignoredEmail,
      role_id: _ignoredRoleId,
      ...restUser
    } = user.get({ plain: true });

    const responseObject = {
      ...restUser,
      email: actualEmail,
      role_id: actualRoleId,
      giftWellID: user.giftWell.id,
      isPersonalDetailsCompleted,
      isRegistrySetupCompleted,
      isRegistryPublished,
      meta: {
        userDetails: user.userDetails || null,
        permissions: {
          routePermissions: getUserRoutePermissions(),
        },
      },
    };

    return responseObject;
  } catch (error) {
    throw error;
  }
};

export { loginUser };
