import db from "@/models";
const createServices = async (servicesData) => {
  return await db.services.create(servicesData);
};

const getAllServices = async () => {
  return await db.services.findAll();
};

export { createServices, getAllServices };
