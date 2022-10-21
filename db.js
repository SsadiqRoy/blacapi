const { Sequelize } = require('sequelize');

/**
 * gets environment variables for connecting with the database depending on localhost or online
 * and if online depending on beta or master
 * @returns Object of Objects form process env
 */
function getConfigOptions() {
  // retrurning evironment variables depending on localhost
  const { db_name, db_password, db_user, db_host, db_port, db_dialect } = process.env;
  return {
    option1: { name: db_name, password: db_password, user: db_user },
    option2: { host: db_host, port: +db_port, dialect: db_dialect },
  };
}

// getting variables for connections
const { option1, option2 } = getConfigOptions();
const { name, password, user } = option1;

// connectiong to the database
const sequelize = new Sequelize(name, user, password, option2);

module.exports = sequelize;
