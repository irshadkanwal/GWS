import db from "@/models";

const getAllGiftWells = async () => {
  const giftWells = await db.giftWell.findAll({
    where: { privacy: "public" },
    include: [
      {
        model: db.users,
        where: {
          is_deleted: false,
        },
        include: [
          { model: db.userDetails, as: "userDetails", required: false },
        ],
      },
      {
        model: db.registryItem,
        include: [db.product],
      },
    ],
  });

  return giftWells
    .filter(({ user }) => {
      return !user?.userDetails?.privacy_settings?.includes("limitAccess");
    })
    .map((giftWell) => {
      const obj = giftWell.toJSON();
      delete obj.user?.userDetails;
      return obj;
    });
};

const getGiftWellById = async (id) => {
  return await db.giftWell.findOne(
    { where: { user_id: id } },
    {
      include: [
        { model: db.users },
        {
          model: db.registryItem,
          include: [db.product],
        },
      ],
    }
  );
};

const createGiftWell = async (giftWellData) => {
  return await db.giftWell.create(giftWellData);
};

const updateGiftWell = async (id, giftWellData) => {
  const giftWell = await db.giftWell.findByPk(id);
  if (!giftWell) {
    throw new Error("Gift well not found");
  }
  return await giftWell.update(giftWellData);
};

const deleteGiftWell = async (id) => {
  const giftWell = await db.giftWell.findByPk(id);
  if (!giftWell) {
    throw new Error("Gift well not found");
  }
  await giftWell.destroy();
  return { message: "Gift well deleted successfully" };
};

export {
  getAllGiftWells,
  getGiftWellById,
  createGiftWell,
  updateGiftWell,
  deleteGiftWell,
};
