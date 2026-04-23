import {
  deleteBlogCategory,
  getBlogCategoryById,
  updateBlogCategory,
} from "@/server/controllers/blogCategoryController";
import methodHandler from "@/utils/requestHandler";

const getHandler = async (req, res) => {
  const { id } = req.query;
  const response = await getBlogCategoryById(id);
  if (!response) {
    return res.status(404).json({ error: "Blogs category not found" });
  }
  return res.status(200).json(response);
};

const putHandler = async (req, res) => {
  const { id } = req.query;
  try {
    const response = await updateBlogCategory(id, req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

const deleteHandler = async (req, res) => {
  const { id } = req.query;
  try {
    const response = await deleteBlogCategory(id);
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
