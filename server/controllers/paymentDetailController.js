import * as paymentDetails from "@/server/handlers/paymentDetails";

async function getAllPaymentDetails() {
  return await paymentDetails.getAllPaymentDetails();
}

async function getPaymentDetailById(id) {
  return await paymentDetails.getPaymentDetailById(id);
}

async function getPaymentDetailByConnectAccountId(connect_account_id) {
  return await paymentDetails.getPaymentDetailsByConnectAccountId(
    connect_account_id
  );
}

async function getPaymentDetailByDonationId(donationId) {
  return await paymentDetails.getPaymentDetailByDonationId(donationId);
}

async function createPaymentDetail(paymentDetailData) {
  try {
    const result = await paymentDetails.createPaymentDetail(paymentDetailData);
    return result;
  } catch (error) {
    throw error;
  }
}

async function updatePaymentDetail(id, paymentDetailData) {
  return await paymentDetails.updatePaymentDetail(id, paymentDetailData);
}

async function deletePaymentDetail(id) {
  return await paymentDetails.deletePaymentDetail(id);
}

export {
  getAllPaymentDetails,
  getPaymentDetailById,
  getPaymentDetailByDonationId,
  createPaymentDetail,
  updatePaymentDetail,
  deletePaymentDetail,
  getPaymentDetailByConnectAccountId,
};
