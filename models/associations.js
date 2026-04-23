export const setupAssociations = (models) => {
  // users associations
  models.users.hasOne(models.userDetails, {
    foreignKey: "user_id",
    as: "userDetails",
  });
  models.users.hasOne(models.giftWell, {
    foreignKey: "user_id",
    as: "giftWell",
  });
  models.users.belongsTo(models.roles, {
    foreignKey: "role_id",
    as: "roles",
  });
  models.users.hasMany(models.registries, { foreignKey: "user_id" });
  models.users.hasMany(models.donation, {
    foreignKey: "user_id",
  });
  models.users.hasMany(models.supportMessages, {
    foreignKey: "user_id",
  });
  models.users.hasMany(models.blog, {
    foreignKey: "user_id",
  });
  models.users.hasMany(models.article, {
    foreignKey: "user_id",
  });
  models.users.hasOne(models.careGiver, {
    foreignKey: "user_id",
    as: "careGiver",
  });

  // userDetails associations
  models.userDetails.belongsTo(models.users, {
    foreignKey: "user_id",
    as: "user",
  });

  // giftWell associations
  models.giftWell.belongsTo(models.users, { foreignKey: "user_id" });
  models.giftWell.hasMany(models.donation, { foreignKey: "giftwell_id" });
  models.giftWell.hasMany(models.registryItem, { foreignKey: "giftwell_id" });
  models.giftWell.hasMany(models.registryServices, {
    foreignKey: "giftwell_id",
  });

  // donation associations
  models.donation.belongsTo(models.giftWell, { foreignKey: "giftwell_id" });
  models.donation.belongsTo(models.users, {
    foreignKey: "user_id",
  });
  models.donation.hasOne(models.paymentDetail, {
    foreignKey: "donation_id",
    as: "paymentDetail",
  });

  // paymentDetail associations
  models.paymentDetail.belongsTo(models.donation, {
    foreignKey: "donation_id",
    as: "donation",
  });

  // registries associations
  models.registries.belongsTo(models.users, { foreignKey: "user_id" });
  models.registries.hasMany(models.registryItem, {
    foreignKey: "giftwell_id",
  });

  // registryItem associations
  models.registryItem.belongsTo(models.giftWell, {
    foreignKey: "giftwell_id",
  });
  models.registryItem.belongsTo(models.product, { foreignKey: "product_id" });
  models.registryItem.belongsTo(models.registries, {
    foreignKey: "giftwell_id",
  });

  // registryServices associations
  models.registryServices.belongsTo(models.giftWell, {
    foreignKey: "giftwell_id",
  });
  // models.registryServices.belongsTo(models.product, {
  //   foreignKey: "product_id",
  // });
  models.registryServices.belongsTo(models.registries, {
    foreignKey: "giftwell_id",
  });

  // product associations
  models.product.hasMany(models.registryItem, { foreignKey: "product_id" });

  // supportMessages associations
  models.supportMessages.belongsTo(models.users, {
    foreignKey: "user_id",
    as: "user",
  });

  // blogs assocaitions
  models.blog.belongsTo(models.users, {
    foreignKey: "user_id",
    as: "user",
  });

  // article assocaitions
  models.article.belongsTo(models.users, {
    foreignKey: "user_id",
    as: "user",
  });

  // Caregiver assocaitions
  models.careGiver.belongsTo(models.users, {
    foreignKey: "user_id",
    as: "user",
  });
};
