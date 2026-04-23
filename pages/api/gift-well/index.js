import {
  getAllGiftWells,
  createGiftWell,
} from "@/server/controllers/giftWellController";
import methodHandler from "@/utils/requestHandler";

const getHandler = async (_req, res) => {
  const response = await getAllGiftWells();
  return res.status(200).json(response);
};

const postHandler = async (req, res) => {
  const response = await createGiftWell(req.body);
  return res.status(201).json(response);
};

export default methodHandler({
  GET: getHandler,
  POST: postHandler,
});
