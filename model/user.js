const crypto = require("crypto");

const { DataTypes } = require("sequelize");

const sequelize = require("../db");

const User = sequelize.define(
  "User",
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
      set(value) {
        const hash = crypto.createHash("sha256").update(value).digest("hex");
        this.setDataValue("password", hash);
      },
    },
    photo: {
      type: DataTypes.STRING(70),
      defaultValue: "default.jpg",
    },
    role: {
      type: DataTypes.STRING(20),
      defaultValue: "user",
    },
    position: {
      type: DataTypes.STRING(20),
      defaultValue: "user",
    },
  },
  {
    defaultScope: { attributes: { exclude: ["password"] } },
  }
);

User.afterCreate((user) => {
  user.dataValues.password = "";
});

module.exports = User;
