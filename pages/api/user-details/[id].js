import {
  createUserDetails,
  getUserDetailsByID,
  updateUserDetails,
} from "@/server/controllers/userDetailController";
import methodHandler from "@/utils/requestHandler";

const getHandler = async (req, res) => {
  const { id } = req.query;
  const response = await getUserDetailsByID(id);
  if (!response) {
    return res.status(404).json({ error: "User not found" });
  }
  return res.status(200).json(response);
};

const postHandler = async (req, res) => {
  const body = req.body;
  const response = await createUserDetails(body);

  if (!response) {
    return res.status(404).json({ error: "User not found" });
  }
  return res.status(201).json({ ...response, status: "success" });
};

const patchHandler = async (req, res) => {
  const { id } = req.query;
  try {
    const response = await updateUserDetails(id, req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

export default methodHandler({
  GET: getHandler,
  POST: postHandler,
  PATCH: patchHandler,
});
