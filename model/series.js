const { DataTypes } = require("sequelize");

const sequelize = require("../db");
const User = require("./user");
const Screenshot = require("./screenshots");
const Season = require("./seasons");

const Serie = sequelize.define(
  "Serie",
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
    image: DataTypes.STRING,
    description: DataTypes.STRING(1000),
    tags: DataTypes.JSON,
    company: DataTypes.STRING,
    companies: DataTypes.JSON,
    charactors: DataTypes.JSON,
    actors: DataTypes.JSON,
    releasedDate: DataTypes.DATEONLY,
    country: DataTypes.STRING,
    rating: DataTypes.STRING(4),
    status: {
      type: DataTypes.ENUM,
      values: ["ended", "ongoing", "paused", "stopped"],
      defaultValue: "ongoing",
    },
  },
  {
    defaultScope: { attributes: { exclude: "UserId" } },
  }
);

// =========== association between user and Serie =====
User.hasMany(Serie, {
  sourceKey: "id",
  foreignKey: "user",
  onDelete: "NO ACTION",
  onUpdate: "NO ACTION",
});
Serie.belongsTo(User, {
  targetKey: "id",
  foreignKey: "user",
  onDelete: "NO ACTION",
  onUpdate: "NO ACTION",
});

// =========== association between Serie and Seasons
Serie.hasMany(Season, {
  sourceKey: "id",
  foreignKey: "serie",
  onDelete: "CASCADE",
  onUpdate: "NO ACTION",
});
Season.belongsTo(Serie, {
  targetKey: "id",
  foreignKey: "serie",
  onDelete: "CASCADE",
  onUpdate: "NO ACTION",
});

// =========== association between Serie and screenshots
Serie.hasMany(Screenshot, {
  sourceKey: "id",
  foreignKey: "serie",
  onDelete: "CASCADE",
  onUpdate: "NO ACTION",
});
Screenshot.belongsTo(Serie, {
  targetKey: "id",
  foreignKey: "serie",
  onDelete: "CASCADE",
  onUpdate: "NO ACTION",
});

//

// ================= HOOKS ==============

Serie.afterFind((serie) => {
  // console.log("🔥", typeof Serie.length);
  // if (!serie) return;
  if (typeof serie.length == "number") {
    serie.forEach((m) => {
      m.tags = JSON.parse(m.tags);
      m.companies = JSON.parse(m.companies);
      m.characters = JSON.parse(m.charactors);
      m.actors = JSON.parse(m.actors);
    });
    return;
  }
  serie.tags = JSON.parse(serie.tags);
  serie.companies = JSON.parse(serie.companies);
  serie.characters = JSON.parse(serie.characters);
  serie.actors = JSON.parse(serie.actors);
});

module.exports = Serie;
