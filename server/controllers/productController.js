import * as products from "@handlers/products";

async function getAllProducts() {
  return await products.getAllProducts();
}

async function getProductById(id) {
  return await products.getProductById(id);
}

async function createProduct(productData) {
  return await products.createProduct(productData);
}

async function updateProduct(id, productData) {
  return await products.updateProduct(id, productData);
}

async function deleteProduct(id) {
  return await products.deleteProduct(id);
}

export {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
