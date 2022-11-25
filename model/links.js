const { DataTypes } = require('sequelize');

const sequelize = require('../db');
// const Movie = require("./movies");

const Link = sequelize.define('Link', {
  id: {
    type: DataTypes.STRING(50),
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  link: DataTypes.STRING,
  part: DataTypes.INTEGER,
  resolution: DataTypes.INTEGER,
  title: DataTypes.STRING(100),
});

module.exports = Link;
