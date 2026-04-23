import {
  createArticle,
  getAllArticles,
} from "@/server/controllers/articleController";
import methodHandler from "@/utils/requestHandler";
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

const getHandler = async (_req, res) => {
  const response = await getAllArticles();
  return res.status(200).json(response);
};

const postHandler = async (req, res) => {
  const response = await createArticle(req.body);
  return res.status(201).json(response);
};

export default methodHandler({
  GET: getHandler,
  POST: postHandler,
});
