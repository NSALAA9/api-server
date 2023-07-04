'use strict';

require('dotenv').config();

const { db } = require('./src/models');
const { start } = require('./src/server');

const PORT = process.env.PORT || 5001;


console.log(process.env.NODE_ENV)

db.sync().then(() => {
    start(PORT);
  }).catch(error => {
    console.error('Error starting server:', error);
  });
  