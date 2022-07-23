const { DataTypes } = require("sequelize");

const sequelize = require("../db");
// const Notification = require("./notifications");
// const { createInstance } = require("../middlewares/globalMiddleware");

const Suggestion = sequelize.define("Suggestion", {
  id: {
    type: DataTypes.STRING(50),
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  by: DataTypes.STRING,
  title: DataTypes.STRING,
  message: DataTypes.STRING,
  on: {
    type: DataTypes.ENUM,
    values: ["movie", "game", "serie"],
  },
});

//

//

/*
options
-------
id,
by - email of client who is suggesting the movie or game or series
title - movie, game, tv serie title
message - anything else
on - movie, game, serie




*/

//

module.exports = Suggestion;
