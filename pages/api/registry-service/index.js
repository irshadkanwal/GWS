import {
  createRegistryService,
  getAllRegistryServices,
} from "@/server/controllers/registryServiceController";
import methodHandler from "@/utils/requestHandler";

const getHandler = async (_req, res) => {
  const response = await getAllRegistryServices();
  return res.status(200).json(response);
};

const postHandler = async (req, res) => {
  const response = await createRegistryService(req.body);
  return res.status(201).json(response);
};

export default methodHandler({
  GET: getHandler,
  POST: postHandler,
});
