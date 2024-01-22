const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

// Create a ticket
router.post('/createTicket', ticketController.createTicket);

// Delete a ticket by ID
router.delete('/deleteTicket/:id', ticketController.deleteTicket);

module.exports = router;
