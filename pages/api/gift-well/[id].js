import {
  getGiftWellById,
  updateGiftWell,
  deleteGiftWell,
} from "@/server/controllers/giftWellController";
import methodHandler from "@/utils/requestHandler";

const getHandler = async (req, res) => {
  const { id } = req.query;
  const response = await getGiftWellById(id);
  if (!response) {
    return res.status(404).json({ error: "Gift well not found" });
  }
  return res.status(200).json(response);
};

const putHandler = async (req, res) => {
  const { id } = req.query;
  try {
    const response = await updateGiftWell(id, req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

const deleteHandler = async (req, res) => {
  const { id } = req.query;
  try {
    const response = await deleteGiftWell(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

export default methodHandler({
  GET: getHandler,
  PUT: putHandler,
  DELETE: deleteHandler,
});
