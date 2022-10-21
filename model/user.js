const bcrypt = require('bcrypt');

const { DataTypes } = require('sequelize');

const sequelize = require('../db');

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING(70),
      defaultValue: 'default.jpg',
    },
    role: {
      type: DataTypes.ENUM,
      values: ['user', 'employee', 'admin', 'superadmin', 'ssadiq'],
      defaultValue: 'user',
    },
    position: {
      type: DataTypes.STRING(20),
      defaultValue: 'user',
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    passwordChangedAt: DataTypes.DATE,
  },
  {
    defaultScope: { attributes: { exclude: ['password'] } },
  }
);

User.afterCreate((user) => {
  user.dataValues.password = '';
});
User.beforeValidate(async (user) => {
  if (user.password) {
    user.password = await bcrypt.hash(user.password, 12);
    // console.log(user.password);
  }
});

module.exports = User;
