import * as registryItems from "@handlers/registryItems";

async function getAllRegistryItems() {
  return await registryItems.getAllRegistryItems();
}

async function getRegistryItemById(id) {
  return await registryItems.getRegistryItemById(id);
}

async function createRegistryItem(registryItemData) {
  return await registryItems.createRegistryItem(registryItemData);
}

async function updateRegistryItem(id, registryItemData) {
  return await registryItems.updateRegistryItem(id, registryItemData);
}

async function deleteRegistryItem(id) {
  return await registryItems.deleteRegistryItem(id);
}

export {
  getAllRegistryItems,
  getRegistryItemById,
  createRegistryItem,
  updateRegistryItem,
  deleteRegistryItem,
};
