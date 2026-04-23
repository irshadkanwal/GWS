import db from "@/models";

const getAllCategories = async () => {
  return await db.blogCategory.findAll();
};

const getBlogCategoryById = async (id) => {
  return await db.blogCategory.findAll({
    where: { user_id: id },
  });
};

const createBlogCategory = async (registryItemData) => {
  return await db.blogCategory.create(registryItemData);
};

const updateBlogCategory = async (id, registryItemData) => {
  const userBlog = await db.blogCategory.findByPk(id);
  if (!userBlog) {
    throw new Error("Blog category not found");
  }
  return await userBlog.update(registryItemData);
};

const deleteBlogCategory = async (id) => {
  const userBlog = await db.blogCategory.findByPk(id);
  if (!userBlog) {
    throw new Error("Blog category not found");
  }
  await userBlog.destroy();
  return { message: "Blog category deleted successfully" };
};

export {
  getAllCategories,
  getBlogCategoryById,
  createBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
};
