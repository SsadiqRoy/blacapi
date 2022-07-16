const { DataTypes } = require("sequelize");

const sequelize = require("../db");

const Screenshot = sequelize.define("Screenshot", {
  id: {
    type: DataTypes.STRING(50),
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  image: DataTypes.STRING,
  text: DataTypes.STRING,
});

module.exports = Screenshot;
