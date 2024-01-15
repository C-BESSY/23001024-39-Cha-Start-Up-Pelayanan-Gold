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

  // Get auditoriums for a specific cinema
  router.get('/:cinemaId/auditoriums', async (req, res) => {
    const { cinemaId } = req.params;
    const auditoriums = await knex('auditoriums').where({ cinema_id: cinemaId });
    res.json(auditoriums);
  });

  return router;
};
