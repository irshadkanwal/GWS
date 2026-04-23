import * as articles from "@handlers/article";

async function getAllArticles() {
  return await articles.getAllArticles();
}

async function getArticlesById(id) {
  return await articles.getArticlesById(id);
}

async function createArticle(articleData) {
  return await articles.createArticle(articleData);
}

async function updateArticle(id, articleData) {
  return await articles.updateArticle(id, articleData);
}

async function deleteArticle(id) {
  return await articles.deleteArticle(id);
}

export {
  getAllArticles,
  getArticlesById,
  createArticle,
  updateArticle,
  deleteArticle,
};
