import db from "@/models";

const getUserDetailsByID = async (id) => {
  return await db.userDetails.findOne({ where: { user_id: id } });
};

const createUserDetails = async (userDetails) => {
  return await db.userDetails.create(userDetails);
};

const updateUserDetails = async (id, userData) => {
  const userDetails = await db.userDetails.findByPk(id);

  if (!userDetails || !userDetails.id) {
    throw new Error("User or associated user details not found");
  }
  return await userDetails.update(
    { ...userDetails, ...userData },
    { where: { user_id: id } }
  );
};

export { getUserDetailsByID, createUserDetails, updateUserDetails };
