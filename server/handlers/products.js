import db from "@/models";

const createProduct = async (productData) => {
  return await db.product.create(productData);
};

const getAllProducts = async () => {
  return await db.product.findAll();
};

const getProductById = async (id) => {
  return await db.product.findByPk(id);
};

const updateProduct = async (id, productData) => {
  const product = await db.product.findByPk(id);
  if (!product) {
    throw new Error("Product not found");
  }
  return await product.update(productData);
};

const deleteProduct = async (id) => {
  const product = await db.product.findByPk(id);
  if (!product) {
    throw new Error("Product not found");
  }
  await product.destroy();
  return { message: "Product deleted successfully" };
};

export {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
