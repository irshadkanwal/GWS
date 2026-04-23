import { createProduct, getAllProducts } from "@/server/controllers/productController";
import methodHandler from "@/utils/requestHandler";


const getHandler = async (_req, res) => {
  const response = await getAllProducts();
  return res.status(200).json(response);
};

const postHandler = async (req, res) => {
  const response = await createProduct(req.body);
  return res.status(201).json(response);
};

export default methodHandler({
  GET: getHandler,
  POST: postHandler,
});
