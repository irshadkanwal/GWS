import db from "@/models";
import GiftWellContributionEmail from "@/utilities/helpers/GiftContributionReceivedEmail";
import { sendEmail } from "@/utilities/helpers/emailService";

const getAllRegistryItems = async () => {
  return await db.registryItem.findAll({
    include: [db.product, db.giftWell],
  });
};

const getRegistryItemById = async (id) => {
  return await db.registryItem.findAll({
    where: { giftwell_id: id },
  });
};

const createRegistryItem = async (registryItemData) => {
  return await db.registryItem.create(registryItemData);
};

const updateRegistryItem = async (id, registryItemData) => {
  const BASE_URL = process.env.NEXT_PUBLIC_URL;

  const registryItem = await db.registryItem.findByPk(id);
  if (!registryItem) {
    throw new Error("Registry item not found");
  }

  const updatedRegistryItem = await registryItem.update(registryItemData);
  const { status, giftwell_id } = updatedRegistryItem;

  if (status === "purchased" && giftwell_id) {
    const giftWell = await db.giftWell.findByPk(giftwell_id);
    const user = await db.users.findByPk(giftWell.user_id);
    const userDetails = await db.userDetails.findOne({
      where: { user_id: user.id },
    });

    if (userDetails && userDetails.privacy_settings.includes("emailAlerts")) {
      await sendEmail(
        user.email,
        "Registry Item Purchased",
        GiftWellContributionEmail(
          `${user.first_name} ${user.last_name}`,
          "gift",
          updatedRegistryItem.registry_product.name,
          null,
          `${BASE_URL}/registry/${user.public_url}`
        )
      );
    }
  }

  return updatedRegistryItem;
};

const deleteRegistryItem = async (id) => {
  const registryItem = await db.registryItem.findByPk(id);
  if (!registryItem) {
    throw new Error("Registry item not found");
  }
  await registryItem.destroy();
  return { message: "Registry item deleted successfully" };
};

export {
  getAllRegistryItems,
  getRegistryItemById,
  createRegistryItem,
  updateRegistryItem,
  deleteRegistryItem,
};
