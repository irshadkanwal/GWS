import db from "@/models";

const getAllArticles = async () => {
  return await db.article.findAll();
};

const getArticlesById = async (id) => {
  return await db.article.findByPk(id);
};

const createArticle = async (articleData) => {
  return await db.article.create(articleData);
};

const updateArticle = async (id, articleData) => {
  const userBlog = await db.article.findByPk(id);
  if (!userBlog) {
    throw new Error("Article not found");
  }
  return await userBlog.update(articleData);
};

const deleteArticle = async (id) => {
  const userBlog = await db.article.findByPk(id);
  if (!userBlog) {
    throw new Error("Article not found");
  }
  await userBlog.destroy();
  return { message: "Article deleted successfully" };
};

export {
  getAllArticles,
  getArticlesById,
  createArticle,
  updateArticle,
  deleteArticle,
};
