const express = require('express');
const router = express.Router();

// Import the controller functions
const { getTickets, updateTicketStatus } = require('../controllers/ticketController');

// Route to get all tickets
router.get('/', getTickets);

// Route to update a ticket's status
router.patch('/:id/status', updateTicketStatus);

module.exports = router;