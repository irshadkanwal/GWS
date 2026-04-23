import { DataTypes } from "sequelize";

export default (sequelize) => {
  const options = {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "registry_items",
  };

  const definition = {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    giftwell_id: { type: DataTypes.INTEGER, allowNull: false },
    product_id: { type: DataTypes.INTEGER, allowNull: false },
    registry_product: { type: DataTypes.JSONB },
    quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
    order_index: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    priority: {
      type: DataTypes.ENUM("low", "medium", "high"),
      defaultValue: "medium",
    },
    is_claimed: { type: DataTypes.BOOLEAN, defaultValue: false },
    status: {
      type: DataTypes.ENUM("listed", "purchased"),
      defaultValue: "listed",
    },
    notes: { type: DataTypes.TEXT },
  };
  return sequelize.define("registryItem", definition, options);
};
