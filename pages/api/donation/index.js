import {
  createDonation,
  getAllDonations,
} from "@/server/controllers/donationController";
import methodHandler from "@/utils/requestHandler";

const getHandler = async (_req, res) => {
  const response = await getAllDonations();
  return res.status(200).json(response);
};

const postHandler = async (req, res) => {
  const response = await createDonation(req.body);
  return res.status(201).json(response);
};

export default methodHandler({
  GET: getHandler,
  POST: postHandler,
});
