import bcrypt from "bcrypt";
import sequelize from "@config/sequelize";
import db from "@/models";
import { sendEmail } from "@/utilities/helpers/emailService";
import jwt from "jsonwebtoken";
import { EmailRequestTemplate } from "@/utilities/helpers/emailRequestsTemplate";
import { Op } from "sequelize";
import { USER_ROLES } from "@/constants/constants";
import { stripe } from "@/lib/stripe";

const _hashedPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

const getAllUsers = async () => {
  return await db.users.findAll({
    include: [
      {
        model: db.roles,
        as: "roles",
        where: {
          name: {
            [Op.ne]: "Administrator",
          },
        },
        attributes: [],
      },
    ],
  });
};

const getUserById = async (id) => {
  const user = await db.users.findByPk(id);

  const userData = user.get({ plain: true });
  const { password, ...restUser } = userData;

  if (!user) {
    return null;
  }
  const userDetails = await db.userDetails.findOne({
    where: { user_id: user.id },
  });

  const giftWell = await db.giftWell.findOne({ where: { user_id: user.id } });

  const registryItems = await db.registryItem.findAll({
    where: { giftwell_id: giftWell.id },
  });

  const donations = await db.donation.findAll({
    where: { user_id: user.id },
  });

  const isPersonalDetailsCompleted = Boolean(
    userDetails?.journey &&
      userDetails?.street_address &&
      userDetails?.city &&
      userDetails?.state &&
      userDetails?.zip_code
  );

  const isRegistryPublished = giftWell?.privacy === "public" ? true : false;

  const isRegistrySetupCompleted =
    !!registryItems?.length || !!donations?.length;

  const updatedUser = {
    ...restUser,
    isPersonalDetailsCompleted,
    isRegistrySetupCompleted,
    isRegistryPublished,
  };

  return updatedUser;
};

const createUser = async (userData) => {
  const {
    password,
    email,
    role_id,
    first_name,
    last_name,
    cash_donation,
    public_url,
    is_deleted,
    recipient_name,
    recipient_email,
    ...userDetails
  } = userData;
  const roles = await db.roles.findAll();

  const careGiverRole = roles.find(
    (role) => role.name === USER_ROLES.CAREGIVER
  );

  const recipientRole = roles.find(
    (role) => role.name === USER_ROLES.RECIPIENT
  );
  const hashedPassword = await _hashedPassword(password);

  const transaction = await sequelize.transaction();

  const isUserRecipient = role_id === recipientRole.id;

  try {
    const recipientUser = await db.users.findOne({
      where: {
        email: isUserRecipient
          ? email.toLowerCase()
          : recipient_email.toLowerCase(),
      },
    });

    if (!isUserRecipient) {
      const careGiver = await db.careGiver.findOne({
        where: {
          email: email.toLowerCase(),
        },
      });

      if (careGiver) {
        throw new Error("Care Giver's email already registered");
      }
    }

    if (recipientUser) {
      throw new Error("Recipient's email already registered");
    }

    const account = await stripe.accounts.create({
      type: "express",
      email: isUserRecipient
        ? email.toLowerCase()
        : recipient_email.toLowerCase(),
      capabilities: {
        transfers: { requested: true },
        card_payments: { requested: true },
      },
    });

    let userFirstName = first_name;
    let userLastName = last_name;

    if (!isUserRecipient && recipient_name) {
      const [fname, ...lnameParts] = recipient_name.trim().split(" ");
      userFirstName = fname;
      userLastName = lnameParts.join(" ") || "";
    }

    const newUser = await db.users.create(
      {
        email: isUserRecipient
          ? email.toLowerCase()
          : recipient_email.toLowerCase(),
        password: hashedPassword,
        role_id: recipientRole.id,
        first_name: userFirstName,
        last_name: userLastName,
        public_url,
        is_deleted,
        stripe_account_id: account.id,
      },
      { transaction }
    );

    if (!isUserRecipient) {
      await db.careGiver.create(
        {
          user_id: newUser.id,
          email,
          password: hashedPassword,
          recipient_name,
          recipient_email,
          role_id: careGiverRole.id,
        },
        { transaction }
      );
    }

    await db.userDetails.create(
      {
        user_id: newUser.id,
        ...userDetails,
      },
      { transaction }
    );

    await db.giftWell.create(
      {
        user_id: newUser.id,
        privacy: "private",
      },
      { transaction }
    );

    if (newUser) {
      const generateTokenAndSend = async (targetEmail) => {
        const token = jwt.sign({ email: targetEmail }, process.env.JWT_SECRET, {
          expiresIn: "15m",
        });

        const verifyUrl = `${process.env.NEXT_PUBLIC_URL}/verify?token=${token}`;

        await sendEmail(
          targetEmail,
          "Email Address Verification",
          EmailRequestTemplate(
            verifyUrl,
            "Verify Your Email",
            "Click the button below to verify your email and activate your account.",
            "Verify Email"
          )
        );
      };

      if (isUserRecipient) {
        await generateTokenAndSend(email.toLowerCase());
      } else {
        await Promise.all([
          generateTokenAndSend(email.toLowerCase()),
          generateTokenAndSend(recipient_email.toLowerCase()),
        ]);
      }
    }

    await transaction.commit();

    const { password, ...safeUser } = newUser.get({ plain: true });

    return safeUser;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const getUserByEmail = async (email) => {
  if (email.includes("@")) {
    // Try finding user by email
    let account = await db.users.findOne({ where: { email } });
    let isCareGiver = false;

    if (!account) {
      // Try caregiver if not a user
      account = await db.careGiver.findOne({ where: { email } });
      isCareGiver = true;
    }

    if (!account) {
      throw new Error("No account found with this email.");
    }

    if (account.is_deleted) {
      throw new Error(
        "Your account has been deactivated. Please contact support for assistance."
      );
    }

    // Send reset email
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    const resetUrl = `${process.env.NEXT_PUBLIC_URL}/reset-password?token=${token}`;
    await sendEmail(
      email,
      "Reset Password",
      EmailRequestTemplate(
        resetUrl,
        "Reset your password",
        "Click the button below to reset your password.",
        "Reset Password"
      )
    );

    const { password, ...accountData } = account.get({ plain: true });
    return accountData;
  }

  const userEmail = `${email}`;
  const user = await db.users.findOne({
    where: { public_url: userEmail },
  });
  if (!user) {
    throw new Error("No user found against this username");
  }

  if (user.is_deleted) {
    throw new Error(
      "Your account has been deactivated. Please contact support for assistance."
    );
  }
  const registry = await db.giftWell.findOne({
    where: { user_id: user.id, privacy: "public" },
  });

  if (!registry) {
    throw new Error("No public registry found against this username");
  }
  const { password, ...restUser } = user.get({ plain: true });

  return restUser;
};

const updateUser = async (id, userData) => {
  let account = await db.users.findByPk(id);
  let isCareGiver = false;

  // Step 1: If not found in users, try caregivers
  if (!account) {
    account = await db.careGiver.findByPk(id);
    isCareGiver = true;
  }

  if (!account) {
    throw new Error("User not found");
  }

  // Step 2: Hash password if provided
  const { password } = userData;
  let hashedPassword = password
    ? await _hashedPassword(password)
    : account.password;

  // Step 3: Update user or caregiver
  const updatedAccount = await account.update({
    ...userData,
    password: hashedPassword,
  });

  // Step 4: Remove password from result
  const { password: _, ...cleanedData } = updatedAccount.get({ plain: true });

  return cleanedData;
};

const deleteUser = async (id) => {
  const user = await db.users.findByPk(id);
  if (!user) {
    throw new Error("User not found");
  }
  await user.destroy();
  return { message: "User deleted successfully" };
};

export {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
};
