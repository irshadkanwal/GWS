import db from "@/models";
const createRoles = async (rolesData) => {
  return await db.roles.create(rolesData);
};

const getAllRoles = async () => {
  return await db.roles.findAll();
};

const getRoleById = async (id) => {
  return await db.roles.findByPk(id);
};

export { createRoles, getAllRoles, getRoleById };
