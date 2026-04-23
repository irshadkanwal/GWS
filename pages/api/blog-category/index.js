import {
  createBlogCategory,
  getAllBlogCategories,
} from "@/server/controllers/blogCategoryController";
import methodHandler from "@/utils/requestHandler";

const getHandler = async (_req, res) => {
  const response = await getAllBlogCategories();
  return res.status(200).json(response);
};

const postHandler = async (req, res) => {
  const response = await createBlogCategory(req.body);
  return res.status(201).json(response);
};

export default methodHandler({
  GET: getHandler,
  POST: postHandler,
});
