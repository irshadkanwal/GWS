import { DataTypes } from "sequelize";

export default (sequelize) => {
  const options = {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "payment_details",
  };

  const definition = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    donation_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "donations",
        key: "id",
      },
    },
    stripe_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    payment_method: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    cardholder_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    last_four_digits: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    connect_account_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    platform_fee: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: 0,
    },
    recipient_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "pending",
      validate: {
        isIn: [["pending", "succeeded", "failed", "processing"]],
      },
    },
    currency: {
      type: DataTypes.STRING,
      defaultValue: "usd",
    },
  };

  return sequelize.define("payment_detail", definition, options);
};
