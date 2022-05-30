const sequelize = require("../db");
const { DataTypes } = require("sequelize");
const tInt = DataTypes.INTEGER;
const tString = DataTypes.STRING;

const Card = sequelize.define("card", {
  id: {
    type: tInt,
    primaryKey: true,
    autoIncrement: true,
  },
  word: {
    type: tString,
  },
  translation: {
    type: tString,
  },
  ownerId: {
    type: tInt,
  },
});

module.exports = Card;
