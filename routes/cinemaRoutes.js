const express = require('express');
const router = express.Router();

module.exports = function (knexInstance) {
  router.get('/', async (req, res) => {
    const cinemas = await knexInstance('cinemas').select('*');
    res.json(cinemas);
  });

  router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const cinema = await knexInstance('cinemas').where({ id }).first();
    res.json(cinema);
  });

  router.post('/create', async (req, res) => {
    console.log(req.body)
    const newCinemaData = req.body

    try {
      const createdCinema = await knexInstance('cinemas').insert(newCinemaData).returning('*');

      res.status(201).json({ message: 'Cinema created successfully', cinema: createdCinema[0] });
    } catch (error) {
      console.error('Error creating cinema:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updatedCinemaData = req.body;

    try {
      const existingCinema = await knexInstance('cinemas').where({ id }).first();
      if (!existingCinema) {
        return res.status(404).json({ error: 'Cinema not found' });
      }

      await knexInstance('cinemas').where({ id }).update(updatedCinemaData);

      res.json({ message: 'Cinema updated successfully' });
    } catch (error) {
      console.error('Error updating cinema:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
      const existingCinema = await knexInstance('cinemas').where({ id }).first();
      if (!existingCinema) {
        return res.status(404).json({ error: 'Cinema not found' });
      }

      await knexInstance('cinemas').where({ id }).del();

      res.json({ message: 'Cinema deleted successfully' });
    } catch (error) {
      console.error('Error deleting cinema:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  return router;
};
