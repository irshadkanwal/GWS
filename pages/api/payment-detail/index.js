import {
  createPaymentDetail,
  getAllPaymentDetails,
  getPaymentDetailByConnectAccountId,
} from "@/server/controllers/paymentDetailController";
import methodHandler from "@/utils/requestHandler";

const getHandler = async (req, res) => {
  try {
    const { connect_account_id } = req.query;

    if (connect_account_id) {
      const filtered = await getPaymentDetailByConnectAccountId(
        connect_account_id
      );
      return res.status(200).json(filtered);
    }

    const response = await getAllPaymentDetails();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const postHandler = async (req, res) => {
  const response = await createPaymentDetail(req.body);
  return res.status(201).json(response);
};

export default methodHandler({
  GET: getHandler,
  POST: postHandler,
});
