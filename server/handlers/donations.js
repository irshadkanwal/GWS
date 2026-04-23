import db from "@/models";
import { Op } from "sequelize";

const getAllDonations = async () => {
  return await db.donation.findAll({
    include: [GiftWell],
  });
};

const getDonationById = async (id) => {
  return await db.donation.findAll({
    where: {
      user_id: id,
      title: {
        [Op.ne]: null,
      },
    },
    include: [db.giftWell],
  });
};

const createDonation = async (donationData) => {
  return await db.donation.create(donationData);
};

const updateDonation = async (id, donationData) => {
  const donation = await db.donation.findByPk(id);
  if (!donation) {
    throw new Error("Donation not found");
  }
  return await donation.update(donationData);
};

const deleteDonation = async (id) => {
  const donation = await db.donation.findByPk(id);
  if (!donation) {
    throw new Error("Donation not found");
  }
  await donation.destroy();
  return { message: "Donation deleted successfully" };
};

export {
  getAllDonations,
  getDonationById,
  createDonation,
  updateDonation,
  deleteDonation,
};
