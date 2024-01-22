const express = require('express')
const router = express.Router()
const knexInstance = require('../knexfile').development
const knex = require('knex')(knexInstance)
const multer = require('multer')
const upload = multer()

router.get('/', async (req, res) => {
  try {
    const auditoriums = await knex('auditoriums').select('*')
    res.json(auditoriums)
  } catch (error) {
    console.error('Error fetching auditoriums:', error.message)
    res.status(500).json({ error: 'Internal Server Error' })
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const auditorium = await knex('auditoriums').where({ id }).first();
    if (!auditorium) {
      return res.status(404).json({ error: 'Auditorium not found' });
    }
    res.json(auditorium);
  } catch (error) {
    console.error('Error fetching auditorium by ID:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/create', upload.none(), async (req, res) => {
  // console.log(req.body)
  const {nama_auditorium, price, price_weekend, cinema_id} = req.body;
  try {
    const createdAuditorium = await knex('auditoriums').insert(req.body).returning('*');
    res.status(201).json({ message: 'Auditorium created successfully', auditorium: createdAuditorium[0] });
  } catch (error) {
    console.error('Error creating auditorium:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/:id', upload.none(), async (req, res) => {
  const { id } = req.params;
  const updatedAuditoriumData = req.body;
  try {
    const existingAuditorium = await knex('auditoriums').where({ id }).first();
    if (!existingAuditorium) {
      return res.status(404).json({ error: 'Auditorium not found' });
    }
    await knex('auditoriums').where({ id }).update(updatedAuditoriumData);
    res.json({ message: 'Auditorium updated successfully' });
  } catch (error) {
    console.error('Error updating auditorium:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const existingAuditorium = await knex('auditoriums').where({ id }).first();
    if (!existingAuditorium) {
      return res.status(404).json({ error: 'Auditorium not found' });
    }
    await knex('auditoriums').where({ id }).del();
    res.json({ message: 'Auditorium deleted successfully' });
  } catch (error) {
    console.error('Error deleting auditorium:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router
