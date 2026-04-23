import {
  deleteUser,
  getUserById,
  updateUser,
} from "@/server/controllers/userContorller";
import methodHandler from "@/utils/requestHandler";

const getHandler = async (req, res) => {
  const { id } = req.query;
  const response = await getUserById(id);
  if (!response) {
    return res.status(404).json({ error: "User not found" });
  }
  return res.status(200).json(response);
};

const patchHandler = async (req, res) => {
  const { id } = req.query;
  try {
    const response = await updateUser(id, req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

const deleteHandler = async (req, res) => {
  const { id } = req.query;
  try {
    const response = await deleteUser(id);
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
