const { DataTypes } = require('sequelize');

const sequelize = require('../db');
const User = require('./user');

const Notification = sequelize.define('Notification', {
  id: {
    type: DataTypes.STRING(50),
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  // on: {
  //   type: DataTypes.ENUM,
  //   values: ['message', 'other'],
  // },
  viewed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  message: DataTypes.STRING,
});

/*



*/

// ========================= association between user and Notification
User.hasMany(Notification, {
  sourceKey: 'id',
  as: 'from',
  onDelete: 'CASCADE',
  onUpdate: 'NO ACTION',
});
Notification.belongsTo(User, {
  targetKey: 'id',
  as: 'from',
  onDelete: 'CASCADE',
  onUpdate: 'NO ACTION',
});

module.exports = Notification;
/*
options
-------
id,
on - whether on schedule, problem, suggestion, other or just a message,
from - sender (user)
to - reciever (user)
schedule - schedule id
suggestion - suggestion id
problem  - problem id



*/
