import { DataTypes } from "sequelize";

export default (sequelize) => {
  const options = {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "services",
  };

  const definition = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
  };
  return sequelize.define("services", definition, options);
};
