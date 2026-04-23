import * as supportMessage from "@handlers/supportMessages";

async function createSupportMessage(messageData) {
  return await supportMessage.createSupportMessage(messageData);
}

async function getSupportMessagesByUserId(userId) {
  return await supportMessage.getSupportMessagesByUserId(userId);
}

export { createSupportMessage, getSupportMessagesByUserId };
