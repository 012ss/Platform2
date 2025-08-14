const Ticket = require('../models/Ticket');

const getTickets = async (req, res) => {
    try {
        // Find all tickets and sort by newest first, excluding resolved ones for the dashboard
        const tickets = await Ticket.find({ status: { $ne: 'RESOLVED' } }).sort({ createdAt: -1 });
        res.json(tickets);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const updateTicketStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // Validate that the new status is a valid option from your schema
        if (!['OPEN', 'PENDING_MANUAL_REVIEW', 'RESOLVED'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status provided.' });
        }

        const ticket = await Ticket.findByIdAndUpdate(
            id,
            { status: status },
            { new: true, runValidators: true }
        );

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found.' });
        }
        res.status(200).json(ticket);
    } catch (error) {
        console.error('Error updating ticket status:', error);
        res.status(400).json({ message: 'Error updating ticket status.' });
    }
};

module.exports = {
    getTickets,
    updateTicketStatus,
};
