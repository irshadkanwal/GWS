import * as blogCategory from "@handlers/blogCategories";

async function getAllBlogCategories() {
  return await blogCategory.getAllCategories();
}

async function getBlogCategoryById(id) {
  return await blogCategory.getBlogCategoryById(id);
}

async function createBlogCategory(registryItemData) {
  return await blogCategory.createBlogCategory(registryItemData);
}

async function updateBlogCategory(id, registryItemData) {
  return await blogCategory.updateBlogCategory(id, registryItemData);
}

async function deleteBlogCategory(id) {
  return await blogCategory.deleteBlogCategory(id);
}

export {
  getAllBlogCategories,
  getBlogCategoryById,
  createBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
};
