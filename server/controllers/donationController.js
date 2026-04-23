import * as donations from "@handlers/donations";

async function getAllDonations() {
  return await donations.getAllDonations();
}

async function getDonationById(id) {
  return await donations.getDonationById(id);
}

async function createDonation(donationData) {
  return await donations.createDonation(donationData);
}

async function updateDonation(id, donationData) {
  return await donations.updateDonation(id, donationData);
}

async function deleteDonation(id) {
  return await donations.deleteDonation(id);
}

export {
  getAllDonations,
  getDonationById,
  createDonation,
  updateDonation,
  deleteDonation,
};
