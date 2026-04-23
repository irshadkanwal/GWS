import db from "@/models";

const getAllRegistryServices = async () => {
  return await db.registryServices.findAll({
    include: [db.product, db.giftWell],
  });
};

const getRegistryServiceById = async (id) => {
  return await db.registryServices.findAll({
    where: { giftwell_id: id },
  });
};

const createRegistryService = async (registryItemData) => {
  return await db.registryServices.create(registryItemData);
};

const updateRegistryService = async (id, registryItemData) => {
  const registryService = await db.registryServices.findByPk(id);
  if (!registryService) {
    throw new Error("Registry service not found");
  }
  return await registryService.update(registryItemData);
};

const deleteRegistryService = async (id) => {
  const registryService = await db.registryServices.findByPk(id);
  if (!registryService) {
    throw new Error("Registry service not found");
  }
  await registryService.destroy();
  return { message: "Registry service deleted successfully" };
};

export {
  getAllRegistryServices,
  getRegistryServiceById,
  createRegistryService,
  updateRegistryService,
  deleteRegistryService,
};
