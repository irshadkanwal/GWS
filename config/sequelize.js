import { Sequelize } from "sequelize";

const env = process.env.NODE_ENV || "development";

const config = {
  development: {
    database: process.env.DB_NAME || "gift_well_soon",
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
    logging: (msg) => {
      console.log("\x1b[36m%s\x1b[0m", msg);
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  production: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
    logging: false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    dialectOptions: {
     ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};

let sequelizeInstance;

if (!global.__myAppSequelizeInstance__) {
  sequelizeInstance = new Sequelize(
    config[env].database,
    config[env].username,
    config[env].password,
    {...config[env]}
  );
  global.__myAppSequelizeInstance__ = sequelizeInstance;
  console.log(`>>>Creating new sequelize instance for ${env} environment<<<`);
} else {
  sequelizeInstance = global.__myAppSequelizeInstance__;
  console.log(`>>>Using existing sequelize instance for ${env} environment<<<`);
}

export default sequelizeInstance;
