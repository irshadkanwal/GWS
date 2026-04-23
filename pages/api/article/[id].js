import {
  deleteArticle,
  getArticlesById,
  updateArticle,
} from "@/server/controllers/articleController";
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
  const response = await getArticlesById(id);
  if (!response) {
    return res.status(404).json({ error: "Articles not found" });
  }
  return res.status(200).json(response);
};

const putHandler = async (req, res) => {
  const { id } = req.query;
  try {
    const response = await updateArticle(id, req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

const deleteHandler = async (req, res) => {
  const { id } = req.query;
  try {
    const response = await deleteArticle(id);
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
