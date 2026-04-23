import methodHandler from "@/utils/requestHandler";
import { createServices, getAllServices } from "@/server/controllers/servicesController";

const postHandler = async (req, res) => {
  const response = await createServices(req.body);
  return res.status(201).json(response);
};

const getHandler = async (_req, res) => {
  const response = await getAllServices();
  return res.status(200).json(response);
};

export default methodHandler({
  GET: getHandler,
  POST: postHandler,
});