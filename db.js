const { Sequelize } = require('sequelize');

/**
 * gets environment variables for connecting with the database depending on localhost or online
 * and if online depending on beta or master
 * @returns Object of Objects form process env
 */
function getConfigOptions() {
  // retrurning evironment variables depending on localhost
  if (process.env.platform === 'local') {
    const { dbl_name, dbl_password, dbl_user, dbl_host, dbl_port, dbl_dialect } = process.env;
    return {
      option1: { name: dbl_name, password: dbl_password, user: dbl_user },
      option2: { host: dbl_host, port: +dbl_port, dialect: dbl_dialect },
    };
  }
  // retrurning evironment variables depending on online
  if (process.env.platform === 'online') {
    const { DB_NAME, DB_BETA_NAME, DB_PASSWORD, DB_USER, DB_HOST, DB_PORT, DB_DIALECT, runon } = process.env;
    return {
      option1: { name: runon === 'beta' ? DB_BETA_NAME : DB_NAME, password: DB_PASSWORD, user: DB_USER },
      option2: { host: DB_HOST, port: +DB_PORT, dialect: DB_DIALECT },
    };
  }
}

// getting variables for connections
const { option1, option2 } = getConfigOptions();
const { name, password, user } = option1;

// connectiong to the database
const sequelize = new Sequelize(name, user, password, option2);

module.exports = sequelize;
