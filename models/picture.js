const sequelize = require("../db");
const { DataTypes } = require("sequelize");
const tInt = DataTypes.INTEGER;
const tString = DataTypes.STRING;
const tBool = DataTypes.BOOLEAN;

const Picture = sequelize.define("picture", {
  id: {
    type: tInt,
    primaryKey: true,
    autoIncrement: true,
  },
  carId: {
    type: tInt,
  },
  link: {
    type: tString,
  },
  isMain: {
    type: tBool,
  },
});

module.exports = Picture;
