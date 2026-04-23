import { getSupportMessagesByUserId } from "@/server/controllers/supportMessageController";
import methodHandler from "@/utils/requestHandler";

const getHandler = async (req, res) => {
  const { id } = req.query;
  const response = await getSupportMessagesByUserId(id);
  if (!response) {
    return res.status(404).json({ error: "Messages not found" });
  }
  return res.status(200).json(response);
};

export default methodHandler({
  GET: getHandler,
});
