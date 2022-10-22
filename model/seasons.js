const { DataTypes } = require('sequelize');

const sequelize = require('../db');
const Episode = require('./episodes');

const Season = sequelize.define('Season', {
  id: {
    type: DataTypes.STRING(50),
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  description: DataTypes.STRING,
  number: DataTypes.INTEGER,
  season: DataTypes.INTEGER,
  title: DataTypes.STRING,
  portrait: DataTypes.STRING(500),
  landscape: DataTypes.STRING(500),
  releasedDate: DataTypes.DATEONLY,
});

//=====================  association between Seasons and Episodes
Season.hasMany(Episode, {
  sourceKey: 'id',
  foreignKey: 'season',
  onDelete: 'CASCADE',
  onUpdate: 'NO ACTION',
});
Episode.belongsTo(Season, {
  targetKey: 'id',
  foreignKey: 'season',
  onDelete: 'CASCADE',
  onUpdate: 'NO ACTION',
});

//

module.exports = Season;
