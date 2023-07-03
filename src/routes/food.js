'use strict';
const express = require('express');
const router = express.Router();
const {Food} = require('../models/index');
//// Create a new food record
router.post('/', async (req, res) => {
  try {
    const { name, description } = req.body;
    const food = await Food.create({ name, description });
    res.status(201).json(food);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create food record' });
  }
});
// Get all food records
router.get('/', async (req, res) => {
  try {
    const foods = await Food.findAll();
    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve food records' });
  }
});
// Get a single food record by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const food = await Food.findByPk(id);
    if (!food) {
      res.status(404).json({ error: 'Food not found' });
    } else {
      res.status(200).json(food);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve food record' });
  }
});
// Update a food record by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const [updatedRows] = await Food.update({ name, description }, { where: { id } });
    if (updatedRows === 0) {
      res.status(404).json({ error: 'Food not found' });
    } else {
      const updatedFood = await Food.findByPk(id);
      res.status(200).json(updatedFood);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update food record' });
  }
});
// Delete a food record by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRows = await Food.destroy({ where: { id } });
    if (deletedRows === 0) {
      res.status(404).json({ error: 'Food not found' });
    } else {
      res.status(204).end();
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete food record' });
  }
});
module.exports = router;