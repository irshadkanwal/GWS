import {
  createUser,
  getAllUsers,
  getUserByEmail,
} from "@/server/controllers/userContorller";
import methodHandler from "@/utils/requestHandler";

const getHandler = async (req, res) => {
  const users = await getAllUsers();
  return res.status(200).json(users);
};

const postHandler = async (req, res) => {
  const { email } = req.body;

  const isEmailOnly = email && Object.keys(req.body).length === 1;

  if (isEmailOnly) {
    try {
      const user = await getUserByEmail(email);

      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      return res.status(200).json(user);
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  }

  try {
    const response = await createUser(req.body);
    return res.status(201).json(response);
  } catch (error) {
    if (error.message === "Email already registered") {
      return res.status(409).json({ message: error.message });
    }

    return res.status(500).json({ message: error.message });
  }
};

export default methodHandler({
  GET: getHandler,
  POST: postHandler,
});
