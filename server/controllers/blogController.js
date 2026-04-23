import * as blogs from "@handlers/blogs";

async function getAllBlogs() {
  return await blogs.getAllBlogs();
}

async function getBlogsById(id) {
  return await blogs.getBlogsById(id);
}

async function createBlog(registryItemData) {
  return await blogs.createBlog(registryItemData);
}

async function updateBlog(id, registryItemData) {
  return await blogs.updateBlog(id, registryItemData);
}

async function deleteBlog(id) {
  return await blogs.deleteBlog(id);
}

export { getAllBlogs, getBlogsById, createBlog, updateBlog, deleteBlog };
