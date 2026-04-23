import * as users from "@handlers/users";

async function getAllUsers() {
  return await users.getAllUsers();
}

async function getUserById(id) {
  return await users.getUserById(id);
}

async function getUserByEmail(email) {
  return await users.getUserByEmail(email);
}

async function createUser(userData) {
  return await users.createUser(userData);
}

async function updateUser(id, userData) {
  return await users.updateUser(id, userData);
}

async function deleteUser(id) {
  return await users.deleteUser(id);
}

export {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
};
