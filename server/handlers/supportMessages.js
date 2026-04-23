import db from "@/models";

const createSupportMessage = async (messageData) => {
  return await db.supportMessages.create(messageData);
};

const getSupportMessagesByUserId = async (userId) => {
  return await db.supportMessages.findAll({
    where: { user_id: userId },
    order: [["created_at", "DESC"]],
  });
};

export { createSupportMessage, getSupportMessagesByUserId };
