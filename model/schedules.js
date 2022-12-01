const { DataTypes } = require('sequelize');

const sequelize = require('../db');
// const { createInstance } = require('../middlewares/globalMiddleware');
// const Notification = require('./notifications');
const User = require('./user');

const Schedule = sequelize.define('Schedule', {
  id: {
    type: DataTypes.STRING(50),
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  date: DataTypes.DATE,
  message: DataTypes.STRING,
  timeoutId: DataTypes.STRING,
});

// ========================= association between user and Notification
User.hasMany(Schedule, {
  sourceKey: 'id',
  foreignKey: 'user',
  onDelete: 'CASCADE',
  onUpdate: 'NO ACTION',
});
Schedule.belongsTo(User, {
  targetKey: 'id',
  foreignKey: 'user',
  onDelete: 'CASCADE',
  onUpdate: 'NO ACTION',
});

Schedule.beforeValidate((schedule) => {
  if (!schedule.user) throw new Error('Schedule must have a user');
});

module.exports = Schedule;
