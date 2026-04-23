import methodHandler from "@/utils/requestHandler";
import jwt from "jsonwebtoken";
import db from "@/models";

const handler = async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ message: "Missing token." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { email } = decoded;

    if (!email) {
      return res.status(400).json({ message: "Invalid token payload." });
    }

    // 1. Try finding in users
    let account = await db.users.findOne({ where: { email } });
    let isCareGiver = false;

    // 2. If not found, try care_giver
    if (!account) {
      account = await db.careGiver.findOne({ where: { email } });
      isCareGiver = true;
    }

    if (!account) {
      return res.status(404).json({ message: "Account not found." });
    }

    const { password, ...accountData } = account.toJSON();

    return res.status(200).json(accountData);
  } catch (err) {
    const isExpired = err.name === "TokenExpiredError";

    return res.status(400).json({
      message: isExpired
        ? "Password reset link has expired. Please request a new one."
        : "Invalid or malformed token.",
    });
  }
};

export default methodHandler({ GET: handler });
