import dotenv from "dotenv";
dotenv.config();

export const config = {
  // * config app
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  // * config database mysql
  dbhost: process.env.HOST_MYSQL,
  dbRootPassword: process.env.ROOT_PASSWORD_MYSQL,
  database: process.env.DATABASE_MYSQL,
  dbUser: process.env.USER_MYSQL,
  dbPassword: process.env.PASSWORD_MYSQL,
};
