import * as userDetails from "../handlers/userDetails";
async function getUserDetailsByID(id) {
  return await userDetails.getUserDetailsByID(id);
}

async function createUserDetails(userData) {
  return await userDetails.createUserDetails(userData);
}

async function updateUserDetails(id, userData) {
  return await userDetails.updateUserDetails(id, userData);
}

export { getUserDetailsByID, createUserDetails,updateUserDetails };