const express = require('express');
const router = express.Router();
const { getTickets, updateTicketStatus } = require('../controllers/ticketController');

// GET all tickets
router.get('/', getTickets);

// PATCH update ticket status
router.patch('/:id/status', updateTicketStatus);

module.exports = router;
