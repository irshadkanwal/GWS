import methodHandler from "@/utils/requestHandler";
import {
  createProductTypes,
  getAllProductTypes,
} from "@/server/controllers/productTypeController";

const postHandler = async (req, res) => {
  const response = await createProductTypes(req.body);
  return res.status(201).json(response);
};

const getHandler = async (_req, res) => {
  const response = await getAllProductTypes();
  return res.status(200).json(response);
};

export default methodHandler({
  GET: getHandler,
  POST: postHandler,
});
