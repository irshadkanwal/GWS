import {
  getAllRegistryItems,
  createRegistryItem,
} from "@/server/controllers/registryItemController";
import methodHandler from "@/utils/requestHandler";

const getHandler = async (_req, res) => {
  const response = await getAllRegistryItems();
  return res.status(200).json(response);
};

const postHandler = async (req, res) => {
  const response = await createRegistryItem(req.body);
  return res.status(201).json(response);
};

export default methodHandler({
  GET: getHandler,
  POST: postHandler,
});
