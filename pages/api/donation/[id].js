import {
  getDonationById,
  updateDonation,
  deleteDonation,
} from "@/server/controllers/donationController";
import methodHandler from "@/utils/requestHandler";

const getHandler = async (req, res) => {
  const { id } = req.query;
  const response = await getDonationById(id);
  if (!response) {
    return res.status(404).json({ error: "Donation not found" });
  }
  return res.status(200).json(response);
};

const patchHandler = async (req, res) => {
  const { id } = req.query;
  try {
    const response = await updateDonation(id, req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

const deleteHandler = async (req, res) => {
  const { id } = req.query;
  try {
    const response = await deleteDonation(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

export default methodHandler({
  GET: getHandler,
  PATCH: patchHandler,
  DELETE: deleteHandler,
});
