import { DataTypes } from "sequelize";

export default (sequelize) => {
  const options = {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "user_details",
  };

  const definition = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    creating_for: {
      type: DataTypes.ENUM("myself", "someone_else"),
      allowNull: false,
      defaultValue: "myself",
    },
    recipient_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    recipient_email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: true,
      },
    },

    products: {
      type: DataTypes.ARRAY(DataTypes.NUMBER),
      allowNull: true,
      defaultValue: [],
    },
    services: {
      type: DataTypes.ARRAY(DataTypes.NUMBER),
      allowNull: true,
      defaultValue: [],
    },
    attachments: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: [],
    },
    cash_donation: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },

    journey: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    street_address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    address_line: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    zip_code: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    privacy_settings: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true,
      defaultValue: [],
    },
    terms_policy: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  };

  return sequelize.define("user_details", definition, options);
};
