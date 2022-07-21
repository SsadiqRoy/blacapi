const { DataTypes } = require("sequelize");

const sequelize = require("../db");
const User = require("./user");
const Problem = require("./problems");
const Suggestion = require("./suggestions");
const Schedule = require("./schedules");

const Notification = sequelize.define("Notification", {
  id: {
    type: DataTypes.STRING(50),
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  on: {
    type: DataTypes.ENUM,
    values: ["schedule", "suggestion", "problem", "message", "other"],
  },
  message: DataTypes.STRING,
});

/*



*/

// ========================= association between user and Notification
User.hasMany(Notification, {
  sourceKey: "id",
  foreignKey: "from",
  onDelete: "CASCADE",
  onUpdate: "NO ACTION",
});
Notification.belongsTo(User, {
  targetKey: "id",
  foreignKey: "from",
  onDelete: "CASCADE",
  onUpdate: "NO ACTION",
});
User.hasMany(Notification, {
  sourceKey: "id",
  foreignKey: "to",
  onDelete: "CASCADE",
  onUpdate: "NO ACTION",
});
Notification.belongsTo(User, {
  targetKey: "id",
  foreignKey: "to",
  onDelete: "CASCADE",
  onUpdate: "NO ACTION",
});

// ========================= association between Problem and Notification
Problem.hasMany(Notification, {
  sourceKey: "id",
  foreignKey: "problem",
  onDelete: "CASCADE",
  onUpdate: "NO ACTION",
});
Notification.belongsTo(Problem, {
  targetKey: "id",
  foreignKey: "problem",
  onDelete: "CASCADE",
  onUpdate: "NO ACTION",
});

// ========================= association between Suggestion and Notification
Suggestion.hasMany(Notification, {
  sourceKey: "id",
  foreignKey: "suggestion",
  onDelete: "CASCADE",
  onUpdate: "NO ACTION",
});
Notification.belongsTo(Suggestion, {
  targetKey: "id",
  foreignKey: "suggestion",
  onDelete: "CASCADE",
  onUpdate: "NO ACTION",
});

// ========================= association between Schedule and Notification
Schedule.hasMany(Notification, {
  sourceKey: "id",
  foreignKey: "schedule",
  onDelete: "CASCADE",
  onUpdate: "NO ACTION",
});
Notification.belongsTo(Schedule, {
  targetKey: "id",
  foreignKey: "schedule",
  onDelete: "CASCADE",
  onUpdate: "NO ACTION",
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
