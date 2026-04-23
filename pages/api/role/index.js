import { createRoles, getAllRoles } from "@/server/controllers/rolesController";
import methodHandler from "@/utils/requestHandler";

const postHandler = async (req, res) => {
  const response = await createRoles(req.body);
  return res.status(201).json(response);
};

const getHandler = async (_req, res) => {
  const response = await getAllRoles();
  return res.status(200).json(response);
};

export default methodHandler({
  GET: getHandler,
  POST: postHandler,
});
