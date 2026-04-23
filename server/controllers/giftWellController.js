import * as giftWells from "@handlers/giftWells";

async function getAllGiftWells() {
  return await giftWells.getAllGiftWells();
}

async function getGiftWellById(id) {
  return await giftWells.getGiftWellById(id);
}

async function createGiftWell(giftWellData) {
  return await giftWells.createGiftWell(giftWellData);
}

async function updateGiftWell(id, giftWellData) {
  return await giftWells.updateGiftWell(id, giftWellData);
}

async function deleteGiftWell(id) {
  return await giftWells.deleteGiftWell(id);
}

export {
  getAllGiftWells,
  getGiftWellById,
  createGiftWell,
  updateGiftWell,
  deleteGiftWell,
};
