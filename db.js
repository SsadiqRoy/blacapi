const { Sequelize } = require("sequelize");

const { db_name, db_password, db_user, db_host } = process.env;

// console.log(db_name, db_password, db_user, host);

const sequelize = new Sequelize(db_name, db_user, db_password, {
  host: db_host,
  dialect: "mysql2",
  port: 3306,
});

module.exports = sequelize;
