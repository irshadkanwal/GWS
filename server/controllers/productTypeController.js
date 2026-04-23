import * as productTypes from "@handlers/productTypes";

async function createProductTypes(giftWellData) {
  return await productTypes.createProductTypes(giftWellData);
}

async function getAllProductTypes() {
  return await productTypes.getAllProductTypes();
}

export { createProductTypes, getAllProductTypes };
