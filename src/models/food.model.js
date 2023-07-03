'use strict';
// const { DataTypes } = require('sequelize');
// const { db } = require('./index');
const Food = (sequelize, DataTypes) => sequelize.define('Food', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
});
module.exports = Food;