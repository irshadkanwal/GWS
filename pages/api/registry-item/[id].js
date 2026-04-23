import {
  getRegistryItemById,
  updateRegistryItem,
  deleteRegistryItem,
} from "@/server/controllers/registryItemController";
import methodHandler from "@/utils/requestHandler";

const getHandler = async (req, res) => {
  const { id } = req.query;
  const response = await getRegistryItemById(id);
  if (!response) {
    return res.status(404).json({ error: "Registry item not found" });
  }
  return res.status(200).json(response);
};

const putHandler = async (req, res) => {
  const { id } = req.query;
  try {
    const response = await updateRegistryItem(id, req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

const deleteHandler = async (req, res) => {
  const { id } = req.query;
  try {
    const response = await deleteRegistryItem(id);
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
