const sequelize = require("../db");
const { DataTypes } = require("sequelize");
const tInt = DataTypes.INTEGER;
const tString = DataTypes.STRING;

const User = sequelize.define("user", {
  id: {
    type: tInt,
    primaryKey: true,
    autoIncrement: true,
  },
  login: {
    type: tString,
    unique: true,
  },
  password: {
    type: tString,
  },
});

module.exports = User;
