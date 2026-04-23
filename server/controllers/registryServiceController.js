import * as registryService from "@handlers/registryServices";

async function getAllRegistryServices() {
  return await registryService.getAllRegistryServices();
}

async function getRegistryServiceById(id) {
  return await registryService.getRegistryServiceById(id);
}

async function createRegistryService(registryItemData) {
  return await registryService.createRegistryService(registryItemData);
}

async function updateRegistryService(id, registryItemData) {
  return await registryService.updateRegistryService(id, registryItemData);
}

async function deleteRegistryService(id) {
  return await registryService.deleteRegistryService(id);
}

export {
  getAllRegistryServices,
  getRegistryServiceById,
  createRegistryService,
  updateRegistryService,
  deleteRegistryService,
};
