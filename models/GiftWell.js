import { DataTypes } from "sequelize";

export default (sequelize) => {
  const options = {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "gift_wells",
  };

  const definition = {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: true },
    description: { type: DataTypes.TEXT },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    privacy: {
      type: DataTypes.ENUM("public", "private"),
      defaultValue: "private",
    },
  };

  return sequelize.define("giftWell", definition, options);
};
