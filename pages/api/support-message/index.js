import { createSupportMessage } from "@/server/controllers/supportMessageController";
import methodHandler from "@/utils/requestHandler";

const postHandler = async (req, res) => {
  const response = await createSupportMessage(req.body);
  return res.status(201).json(response);
};

export default methodHandler({
  POST: postHandler,
});
