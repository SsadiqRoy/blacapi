const { DataTypes } = require("sequelize");

const sequelize = require("../db");
const Link = require("./links");

const Episode = sequelize.define("Episode", {
  id: {
    type: DataTypes.STRING(50),
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  episode: DataTypes.INTEGER,
  title: DataTypes.STRING,
  image: DataTypes.STRING,
  releasedDate: DataTypes.DATEONLY,
});

// ======================== associaton between episodes and links
Episode.hasMany(Link, {
  sourceKey: "id",
  foreignKey: "episode",
  onDelete: "CASCADE",
  onUpdate: "NO ACTION",
});
Link.belongsTo(Episode, {
  targetKey: "id",
  foreignKey: "episode",
  onDelete: "CASCADE",
  onUpdate: "NO ACTION",
});

//

module.exports = Episode;
