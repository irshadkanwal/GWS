import {
  deleteBlog,
  getBlogsById,
  updateBlog,
} from "@/server/controllers/blogController";
import methodHandler from "@/utils/requestHandler";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

const getHandler = async (req, res) => {
  const { id } = req.query;
  const response = await getBlogsById(id);
  if (!response) {
    return res.status(404).json({ error: "Blogs not found" });
  }
  return res.status(200).json(response);
};

const putHandler = async (req, res) => {
  const { id } = req.query;
  try {
    const response = await updateBlog(id, req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

const deleteHandler = async (req, res) => {
  const { id } = req.query;
  try {
    const response = await deleteBlog(id);
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
