import methodHandler from "@/utils/requestHandler";
import { getRoleById } from "@/server/controllers/rolesController";

const getHandler = async (req, res) => {
  const { id } = req.query;
  const response = await getRoleById(id);
  if (!response) {
    return res.status(404).json({ error: "Role not found" });
  }
  return res.status(200).json(response);
};

export default methodHandler({
  GET: getHandler,
});
