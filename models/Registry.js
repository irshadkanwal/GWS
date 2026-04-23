import { DataTypes } from "sequelize";
import sequelize from "@config/sequelize";

export default (sequelize) => {
  const options = {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "registries",
  };

  const definition = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
    },
    event_date: {
      type: DataTypes.DATE,
    },
    privacy: {
      type: DataTypes.ENUM("public", "private"),
      defaultValue: "public",
    },
    is_public: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    share_link: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: true,
    },
  };

  return sequelize.define("registries", definition, options);
};
