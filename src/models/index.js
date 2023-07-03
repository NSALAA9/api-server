'use strict';
const { Sequelize, DataTypes } = require("sequelize");
const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URI;
const sequelizeOptions = process.env.NODE_ENV === 'production'
  ? {
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      }
    }
  : {};
const sequelize = new Sequelize(DATABASE_URL, sequelizeOptions);
const food = require('./food.model'); //(sequelize, DataTypes)
module.exports = {
  db: sequelize,
  Food: food(sequelize, DataTypes),
};