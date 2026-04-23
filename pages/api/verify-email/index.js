import jwt from "jsonwebtoken";
import db from "@/models";

export default async function handler(req, res) {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ message: "Missing token." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { email } = decoded;

    // Try verifying user first
    const [userUpdatedCount] = await db.users.update(
      { is_verified: true },
      {
        where: {
          email,
          is_verified: false,
        },
      }
    );

    // If user wasn't updated, try caregiver
    if (userUpdatedCount === 0) {
      const [careGiverUpdatedCount] = await db.careGiver.update(
        { is_verified: true },
        {
          where: {
            email,
            is_verified: false,
          },
        }
      );

      if (careGiverUpdatedCount === 0) {
        return res
          .status(200)
          .json({ message: "Email already verified or not found." });
      }
    }

    return res.status(200).json({ message: "Email verified successfully." });
  } catch (err) {
    const isExpired = err.name === "TokenExpiredError";

    return res.status(400).json({
      message: isExpired
        ? "Your verification link has expired. Please try signing in again to receive a new verification email."
        : "Invalid or malformed token.",
    });
  }
}
