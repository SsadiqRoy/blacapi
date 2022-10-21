const { DataTypes } = require('sequelize');

const sequelize = require('../db');
const User = require('./user');
const Link = require('./links');
const Screenshot = require('./screenshots');

const Movie = sequelize.define(
  'Movie',
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
    portrait: DataTypes.STRING,
    landscape: DataTypes.STRING,
    description: DataTypes.STRING(1000),
    tags: DataTypes.JSON,
    keywords: DataTypes.JSON,
    company: DataTypes.STRING,
    companies: DataTypes.JSON,
    charactors: DataTypes.JSON,
    actors: DataTypes.JSON,
    directors: DataTypes.JSON,
    releasedDate: DataTypes.DATEONLY,
    country: DataTypes.STRING,
    rating: DataTypes.STRING(4),
  },
  {
    // defaultScope: { attributes: { exclude: "UserId" } },
  }
);

// =========== association between user and movie =====
User.hasMany(Movie, {
  sourceKey: 'id',
  foreignKey: 'user',
  onDelete: 'SET NULL',
  onUpdate: 'NO ACTION',
});
Movie.belongsTo(User, {
  targetKey: 'id',
  foreignKey: 'user',
  onDelete: 'SET NULL',
  onUpdate: 'NO ACTION',
});

// =========== association between Movie and Links
Movie.hasMany(Link, {
  sourceKey: 'id',
  foreignKey: 'movie',
  onDelete: 'CASCADE',
  onUpdate: 'NO ACTION',
});
Link.belongsTo(Movie, {
  targetKey: 'id',
  foreignKey: 'movie',
  onDelete: 'CASCADE',
  onUpdate: 'NO ACTION',
});

// =========== association between Movie and screenshots
Movie.hasMany(Screenshot, {
  sourceKey: 'id',
  foreignKey: 'movie',
  onDelete: 'CASCADE',
  onUpdate: 'NO ACTION',
});
Screenshot.belongsTo(Movie, {
  targetKey: 'id',
  foreignKey: 'movie',
  onDelete: 'CASCADE',
  onUpdate: 'NO ACTION',
});

//

// ================= HOOKS ==============

Movie.afterFind((movie) => {
  // if (typeof movie.length == 'number') {
  // movie.forEach((m) => {
  // m.tags = JSON.parse(m.tags);
  // m.companies = JSON.parse(m.companies);
  // m.charactors = JSON.parse(m.charactors);
  // m.actors = JSON.parse(m.actors);
  // m.directors = JSON.parse(m.directors);
  // });
  // return;
  // }
  // movie.tags = JSON.parse(movie.tags);
  // movie.companies = JSON.parse(movie.companies);
  // movie.charactors = JSON.parse(movie.charactors);
  // movie.actors = JSON.parse(movie.actors);
  // movie.directors = JSON.parse(movie.directors);
});

module.exports = Movie;
