require('dotenv/config');

const config = {
  user: process.env.DBUSER,
  password: process.env.PASSWORD,
  server: process.env.SERVER,
  database: process.env.DB,
  port: 1433,
  options: {
    encrypt: false,
  },
};
module.exports = config;
