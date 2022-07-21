const { DataTypes } = require("sequelize");

const sequelize = require("../db");
const Movie = require("./movies");
const Game = require("./games");
const Serie = require("./series");

const Problem = sequelize.define("Problem", {
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
    values: ["movie", "game", "serie", "other"],
  },
});

/*




*/

// ========================= association between movie and Problem
Movie.hasMany(Problem, {
  sourceKey: "id",
  foreignKey: "movie",
  onDelete: "CASCADE",
  onUpdate: "NO ACTION",
});
Problem.belongsTo(Movie, {
  targetKey: "id",
  foreignKey: "movie",
  onDelete: "CASCADE",
  onUpdate: "NO ACTION",
});

// ========================= association between game and Problem
Game.hasMany(Problem, {
  sourceKey: "id",
  foreignKey: "game",
  onDelete: "CASCADE",
  onUpdate: "NO ACTION",
});
Problem.belongsTo(Game, {
  targetKey: "id",
  foreignKey: "game",
  onDelete: "CASCADE",
  onUpdate: "NO ACTION",
});

// ========================= association between series and Problem
Serie.hasMany(Problem, {
  sourceKey: "id",
  foreignKey: "serie",
  onDelete: "CASCADE",
  onUpdate: "NO ACTION",
});
Problem.belongsTo(Serie, {
  targetKey: "id",
  foreignKey: "serie",
  onDelete: "CASCADE",
  onUpdate: "NO ACTION",
});

//

//

Problem.afterCreate((problem) => {
  const body = {
    on: "problem",
    message: `There is a new problem on a/an ${problem.on}`,
    problem: problem.id,
  };
  createInstance(Model, body);
});

/*
options
-------
Reporting a problem like broken link
id,
by - email of client who is suggesting the movie or game or series
title - movie, game, tv serie title
message - anything else
on - movie, game, serie or anything else



*/

module.exports = Problem;
