'use strict';
require('dotenv').config();
const supertest = require('supertest');
const {app} = require('../src/server');
const request = supertest(app);
const { db } = require('../src/models/index'); // Import the Sequelize instance
beforeAll(async () => {
  await db.sync();
});
afterAll(async () => {
  await db.drop();
});
describe('Food API Endpoints', () => {
  it('should create a new food record', async () => {
    const response = await request.post('/food').send({
      name: 'Pizza',
      description: 'Italian',
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('Pizza');
    expect(response.body.description).toBe('Italian');
  });
  it('should get all food records', async () => {
    const response = await request.get('/food');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
  it('should get a single food record', async () => {
    // First, create a food record to retrieve its id
    const createResponse = await request.post('/food').send({
      name: 'Burger',
      description: 'American',
    });
    const foodId = createResponse.body.id;
    // Then, retrieve the food record by its id
    const getResponse = await request.get(`/food/${foodId}`);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body).toHaveProperty('id');
    expect(getResponse.body.name).toBe('Burger');
    expect(getResponse.body.description).toBe('American');
  });
  it('should update a food record', async () => {
    // First, create a food record to update
    const createResponse = await request.post('/food').send({
      name: 'Sushi',
      description: 'Japanese',
    });
    const foodId = createResponse.body.id;
    // Then, update the food record
    const updateResponse = await request
      .put(`/food/${foodId}`)
      .send({ description: 'Asian' });
    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body).toHaveProperty('id');
    expect(updateResponse.body.name).toBe('Sushi');
    expect(updateResponse.body.description).toBe('Asian');
  });
  it('should delete a food record', async () => {
    // First, create a food record to delete
    const createResponse = await request.post('/food').send({
      name: 'Ice Cream',
      type: 'Dessert',
    });
    const foodId = createResponse.body.id;
    // Then, delete the food record
    const deleteResponse = await request.delete(`/food/${foodId}`);
    expect(deleteResponse.status).toBe(204);
  });
});