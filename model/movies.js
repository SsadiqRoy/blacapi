const { DataTypes } = require("sequelize");

const sequelize = require("../db");
const User = require("./user");
const Link = require("./links");
const Screenshot = require("./screenshots");

const Movie = sequelize.define(
  "Movie",
  {
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
    actors: DataTypes.JSON,
    releasedDate: DataTypes.DATEONLY,
    country: DataTypes.STRING,
    rating: DataTypes.STRING(4),
  },
  {
    defaultScope: { attributes: { exclude: "UserId" } },
  }
);

// =========== association between user and movie =====
User.hasMany(Movie, {
  sourceKey: "id",
  foreignKey: "user",
  onDelete: "NO ACTION",
  onUpdate: "NO ACTION",
});
Movie.belongsTo(User, {
  targetKey: "id",
  foreignKey: "user",
  onDelete: "NO ACTION",
  onUpdate: "NO ACTION",
});

// =========== association between Movie and Links
Movie.hasMany(Link, {
  sourceKey: "id",
  foreignKey: "movie",
  onDelete: "CASCADE",
  onUpdate: "NO ACTION",
});
Link.belongsTo(Movie, {
  targetKey: "id",
  foreignKey: "movie",
  onDelete: "CASCADE",
  onUpdate: "NO ACTION",
});

// =========== association between Movie and screenshots
Movie.hasMany(Screenshot, {
  sourceKey: "id",
  foreignKey: "movie",
  onDelete: "CASCADE",
  onUpdate: "NO ACTION",
});
Screenshot.belongsTo(Movie, {
  targetKey: "id",
  foreignKey: "movie",
  onDelete: "CASCADE",
  onUpdate: "NO ACTION",
});

//

// ================= HOOKS ==============

Movie.afterFind((movie) => {
  // console.log("🔥", typeof movie.length);
  if (typeof movie.length == "number") {
    movie.forEach((m) => {
      m.tags = JSON.parse(m.tags);
      m.companies = JSON.parse(m.companies);
      m.characters = JSON.parse(m.characters);
      m.actors = JSON.parse(m.actors);
    });
    return;
  }
  movie.tags = JSON.parse(movie.tags);
  movie.companies = JSON.parse(movie.companies);
  movie.characters = JSON.parse(movie.characters);
  movie.actors = JSON.parse(movie.actors);
});

module.exports = Movie;
