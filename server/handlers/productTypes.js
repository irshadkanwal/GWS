import db from "@/models";
const createProductTypes = async (servicesData) => {
  return await db.productTypes.create(servicesData);
};

const getAllProductTypes = async () => {
  return await db.productTypes.findAll();
};

export { createProductTypes, getAllProductTypes };
