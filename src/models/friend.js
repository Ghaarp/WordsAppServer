const sequelize = require("../db");
const { DataTypes } = require("sequelize");
const tInt = DataTypes.INTEGER;
const tBool = DataTypes.BOOLEAN;

const Friend = sequelize.define("friend", {
  id: {
    type: tInt,
    primaryKey: true,
    autoIncrement: true,
  },
  owner: {
    type: tInt,
  },
  friend: {
    type: tInt,
  },
  shareCards: {
    type: tBool,
  },
});

module.exports = Friend;
