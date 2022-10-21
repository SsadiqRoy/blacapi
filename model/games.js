const { DataTypes } = require('sequelize');

const sequelize = require('../db');
const User = require('./user');
const Link = require('./links');
const Screenshot = require('./screenshots');

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
  portrait: DataTypes.STRING,
  landscape: DataTypes.STRING,
  description: DataTypes.STRING,
  about: DataTypes.STRING(2234),
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

// // ============= Games associating with screenshots
Game.hasMany(Screenshot, {
  sourceKey: 'id',
  foreignKey: 'game',
  onDelete: 'CASCADE',
  onUpdate: 'NO ACTION',
});

Screenshot.belongsTo(Game, {
  targetKey: 'id',
  foreignKey: 'game',
  onDelete: 'CASCADE',
  onUpdate: 'NO ACTION',
});

//

// ================= HOOKS ==============

Game.afterFind((game) => {
  // console.log(game);
  // console.log("🔥", typeof game.length);
  // if (typeof game.length == 'number') {
  //   game.forEach((g) => {
  //     g.tags = JSON.parse(g.tags);
  //     g.companies = JSON.parse(g.companies);
  //   });
  //   return;
  // }
  // game.tags = JSON.parse(game.tags);
  // game.companies = JSON.parse(game.companies);
});

module.exports = Game;
