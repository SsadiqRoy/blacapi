const { DataTypes } = require('sequelize');

const sequelize = require('../db');
const User = require('./user');
const Link = require('./links');

const Game = sequelize.define('Game', {
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
  description: DataTypes.STRING,
  about: DataTypes.STRING(9999),
  tags: DataTypes.JSON,
  keywords: DataTypes.JSON,
  company: DataTypes.STRING,
  companies: DataTypes.JSON,
  rating: DataTypes.STRING(4),
  releasedDate: DataTypes.DATEONLY,
});

// ============= ASSOCIATIONS ==========

// ============= User associating with Gamese
User.hasMany(Game, {
  sourceKey: 'id',
  foreignKey: 'user',
  onDelete: 'SET NULL',
  onUpdate: 'NO ACTION',
});

Game.belongsTo(User, {
  targetKey: 'id',
  foreignKey: 'user',
  onDelete: 'SET NULL',
  onUpdate: 'NO ACTION',
});

// // ============= Games associating with links
Game.hasMany(Link, {
  sourceKey: 'id',
  foreignKey: 'game',
  onDelete: 'CASCADE',
  onUpdate: 'NO ACTION',
});

Link.belongsTo(Game, {
  targetKey: 'id',
  foreignKey: 'game',
  onDelete: 'CASCADE',
  onUpdate: 'NO ACTION',
});

//

// ================= HOOKS ==============

module.exports = Game;
