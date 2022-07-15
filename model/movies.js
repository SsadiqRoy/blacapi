const { DataTypes } = require("sequelize");

const sequelize = require("../db");
const User = require("./user");
const Link = require("./links");

const Movie = sequelize.define("Movie", {
  id: {
    type: DataTypes.STRING(50),
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: DataTypes.STRING,
  description: DataTypes.STRING(1000),
  tags: DataTypes.JSON,
  company: DataTypes.STRING,
  companies: DataTypes.JSON,
  characters: DataTypes.JSON,
  releasedDate: DataTypes.DATEONLY,
  country: DataTypes.STRING,
  rating: DataTypes.DECIMAL,
});

User.hasMany(Movie, {
  foreignKey: "user",
  onDelete: "NO ACTION",
  onUpdate: "NO ACTION",
});
Movie.belongsTo(User, {
  foreignKey: "user",
  onDelete: "NO ACTION",
  onUpdate: "NO ACTION",
});

Movie.hasMany(Link, {
  foreignKey: "movie",
  onDelete: "CASCADE",
  onUpdate: "NO ACTION",
});
Link.belongsTo(Movie, {
  foreignKey: "movie",
  onDelete: "CASCADE",
  onUpdate: "NO ACTION",
});

module.exports = Movie;
