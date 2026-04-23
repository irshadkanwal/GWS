import * as roles from "@handlers/roles";

async function createRoles(rolesData) {
  return await roles.createRoles(rolesData);
}

async function getAllRoles() {
  return await roles.getAllRoles();
}

async function getRoleById(id) {
  return await roles.getRoleById(id);
}

export { createRoles, getAllRoles, getRoleById };
