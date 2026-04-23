import methodHandler from "@/utils/requestHandler";
import { createUserDetails } from "@/server/controllers/userDetailController";
const postHandler = async (req, res) => {
  const response = await createUserDetails(req.body);
  return res.status(201).json(response);
};

export default methodHandler({
  POST: postHandler,
});