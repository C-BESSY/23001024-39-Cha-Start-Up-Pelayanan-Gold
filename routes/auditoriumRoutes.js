const express = require('express');
const router = express.Router();
const knex = require('../knexfile');

router.get('/auditoriums', async (req, res) => {
  try {
    const auditoriums = await knex('auditoriums').select('*');
    res.json(auditoriums);
  } catch (error) {
    console.error('Error fetching auditoriums:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
