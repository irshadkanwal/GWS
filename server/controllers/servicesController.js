import * as services from "@handlers/services";

async function createServices(giftWellData) {
  return await services.createServices(giftWellData);
}

async function getAllServices() {
  return await services.getAllServices();
}

export {createServices,getAllServices};