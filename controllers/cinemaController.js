const knex = require('../knexInstance')

exports.updateCinema = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCinema = req.body;

    const result = await knex('cinemas')
      .where({ id })
      .update(updatedCinema);

    if (result) {
      res.json({ message: 'Cinema updated successfully' });
    } else {
      res.status(404).json({ error: 'Cinema not found' });
    }
  } catch (error) {
    console.error('Error updating cinema:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
