const { DataTypes } = require('sequelize');

const sequelize = require('../db');
const User = require('./user');
const Season = require('./seasons');

const Serie = sequelize.define(
  'Serie',
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
    portrait: DataTypes.STRING(500),
    landscape: DataTypes.STRING(500),
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
    status: {
      type: DataTypes.ENUM,
      values: ['ended', 'ongoing', 'paused', 'stopped'],
      defaultValue: 'ongoing',
    },
  },
  {
    defaultScope: { attributes: { exclude: 'UserId' } },
  }
);

// =========== association between user and Serie =====
User.hasMany(Serie, {
  sourceKey: 'id',
  foreignKey: 'user',
  onDelete: 'SET NULL',
  onUpdate: 'NO ACTION',
});
Serie.belongsTo(User, {
  targetKey: 'id',
  foreignKey: 'user',
  onDelete: 'SET NULL',
  onUpdate: 'NO ACTION',
});

// =========== association between Serie and Seasons
Serie.hasMany(Season, {
  sourceKey: 'id',
  foreignKey: 'serie',
  onDelete: 'CASCADE',
  onUpdate: 'NO ACTION',
});
Season.belongsTo(Serie, {
  targetKey: 'id',
  foreignKey: 'serie',
  onDelete: 'CASCADE',
  onUpdate: 'NO ACTION',
});

//

// ================= HOOKS ==============

module.exports = Serie;
