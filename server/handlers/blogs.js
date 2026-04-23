import db from "@/models";

const getAllBlogs = async () => {
  return await db.blog.findAll({ where: { status: "published" } });
};

const getBlogsById = async (id) => {
  return await db.blog.findAll({
    where: { user_id: id },
  });
};

const createBlog = async (registryItemData) => {
  return await db.blog.create(registryItemData);
};

const updateBlog = async (id, registryItemData) => {
  const userBlog = await db.blog.findByPk(id);
  if (!userBlog) {
    throw new Error("Blog not found");
  }
  return await userBlog.update(registryItemData);
};

const deleteBlog = async (id) => {
  const userBlog = await db.blog.findByPk(id);
  if (!userBlog) {
    throw new Error("Blog not found");
  }
  await userBlog.destroy();
  return { message: "Blog deleted successfully" };
};

export { getAllBlogs, getBlogsById, createBlog, updateBlog, deleteBlog };
