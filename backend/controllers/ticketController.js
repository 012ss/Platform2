const Ticket = require('../models/Ticket');

// Get all tickets except resolved
const getTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find({ status: { $ne: 'RESOLVED' } })
                                    .sort({ createdAt: -1 });
        res.json(tickets);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Update ticket status
const updateTicketStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // Ensure status is valid
        if (!['OPEN', 'PENDING_MANUAL_REVIEW', 'RESOLVED'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status provided.' });
        }

        const updatedTicket = await Ticket.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true }
        );

        if (!updatedTicket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        res.json(updatedTicket);
    } catch (error) {
        console.error('Error updating ticket status:', error);
        res.status(500).json({ message: 'Error updating ticket status' });
    }
};

module.exports = {
    getTickets,
    updateTicketStatus
};
