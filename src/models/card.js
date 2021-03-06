const sequelize = require("../db");
const { DataTypes } = require("sequelize");
const tInt = DataTypes.INTEGER;
const tString = DataTypes.STRING;
const tText = DataTypes.TEXT;

const Card = sequelize.define("card", {
  id: {
    type: tInt,
    primaryKey: true,
    autoIncrement: true,
  },
  ownerId: {
    type: tInt,
  },
  expression: {
    type: tString,
  },
  translation: {
    type: tString,
  },
  cardJSON: {
    type: tText,
  },
  image: {
    type: tText,
  },
});

module.exports = Card;
