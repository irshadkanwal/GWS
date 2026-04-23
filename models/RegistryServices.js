import { DataTypes } from "sequelize";

export default (sequelize) => {
  const options = {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "registry_services",
  };

  const definition = {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    giftwell_id: { type: DataTypes.INTEGER, allowNull: false },
    service_id: { type: DataTypes.INTEGER, allowNull: false },
    registry_service: { type: DataTypes.JSONB },
    order_index: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_claimed: { type: DataTypes.BOOLEAN, defaultValue: false },
    status: {
      type: DataTypes.ENUM("listed", "availed"),
      defaultValue: "listed",
    },
    notes: { type: DataTypes.TEXT },
  };
  return sequelize.define("registryServices", definition, options);
};
