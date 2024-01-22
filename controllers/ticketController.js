const Ticket = require('../models/ticket');

exports.createTicket = async (req, res) => {
  const { book_id } = req.body;

  try {
    const newTicket = await Ticket.query().insert({
      book_id,
    });

    res.status(201).json({ message: 'Ticket created successfully', newTicket });
  } catch (error) {
    console.error('Error creating ticket:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteTicket = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRows = await Ticket.query().deleteById(id);

    if (deletedRows > 0) {
      res.status(200).json({ message: 'Ticket deleted successfully' });
    } else {
      res.status(404).json({ error: 'Ticket not found' });
    }
  } catch (error) {
    console.error('Error deleting ticket:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
