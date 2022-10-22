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

//
// Schedule.beforeCreate((schedule) => {
//   const time = new Date(schedule.date).getTime() - Date.now();
//   const date = new Date(schedule.date).toLocaleDateString(undefined, {
//     weekday: 'short',
//     month: 'long',
//     day: 'numeric',
//     hour: 'numeric',
//     minute: 'numeric',
//   });
//   const timeout = setTimeout(async () => {
//     const body = {
//       on: 'schedule',
//       message: `There is a new schedule on ${date}`,
//       schedule: schedule.id,
//     };
//     await createInstance(Notification, body);
//   }, time);

//   schedule.timeoutId = `${timeout}`;
// });

//
// Schedule.beforeUpdate(async (schedule) => {
//   clearTimeout(schedule.timeoutId);
//   await Notification.destroy({ where: { schedule: schedule.id } });

//   const time = new Date(schedule.date).getTime() - Date.now();

//   const date = new Date(schedule.date).toLocaleDateString(undefined, {
//     weekday: 'short',
//     month: 'long',
//     day: 'numeric',
//     hour: 'numeric',
//     minute: 'numeric',
//   });
//   const timeout = setTimeout(async () => {
//     const body = {
//       on: 'schedule',
//       message: `There is a new schedule on ${date}`,
//       schedule: schedule.id,
//     };
//     await createInstance(Notification, body);
//   }, time);

//   schedule.timeoutId = `${timeout}`;
// });

//
// Schedule.afterDestroy(async (schedule) => {
//   clearTimeout(schedule.timeoutId);
//   await Notification.destroy({ where: { schedule: schedule.id } });
// });

//

module.exports = Schedule;
