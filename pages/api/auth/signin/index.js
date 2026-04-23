import { loginUser } from "@/server/controllers/authController";
import methodHandler from "@/utils/requestHandler";

const postHandler = async (req, res) => {
  try {
    const response = await loginUser(req.body);
    return res.status(200).json(response);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json(error.message);
    }
  }
};

export default methodHandler({
  POST: postHandler,
});
