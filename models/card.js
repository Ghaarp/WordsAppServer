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
  word: {
    type: tString,
  },
  translation: {
    type: tString,
  },
  translationData: {
    type: tText,
  },
  image: {
    type: tString,
  },
  images: {
    type: tText,
  },
});

module.exports = Card;
