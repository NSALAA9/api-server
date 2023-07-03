'use strict';
const express = require('express');
const app = express();
const foodModel = require('./models/food.model');
// const clothesModel = require('./models/clothes');
const foodRouter = require('./routes/food');
const clothesRouter = require('./routes/clothes');
const notFoundHandler = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');
// app.use(cors());
app.use(express.json());
// Routes
app.use('/food', foodRouter);
// app.use('/clothes', clothesRouter);
// Error handlers
app.use(notFoundHandler);
app.use(errorHandler);
app.get('/', (req, res) => {
    console.log(people)
    res.status(200).json({
      message: 'Welcome to home page!'
    })
  })
  app.use(foodRouter);
function start(port) {
  app.listen(port, () => console.log(`Up an running on port: ${port}`));
}
module.exports = {
  start,
  app
}