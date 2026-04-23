import { DataTypes } from "sequelize";

export default (sequelize) => {
  const options = {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "support_messages",
  };

  const definition = {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    sender_name: { type: DataTypes.STRING, allowNull: false },
    message: { type: DataTypes.TEXT },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
  };

  return sequelize.define("support_messages", definition, options);
};
