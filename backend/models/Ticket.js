// backend/models/Ticket.js

const mongoose = require('mongoose');

// This sub-schema is for images stored directly in MongoDB
const imageSchema = new mongoose.Schema({
    data: {
        type: Buffer, // Binary data for the image
        required: true
    },
    contentType: { // Renamed from 'type' for clarity
        type: String, // MIME type (e.g., 'image/jpeg')
        required: true
    }
});

const ticketSchema = new mongoose.Schema({
    category: {
        type: String,
        enum: ["Room Issue", "Front Desk Services", "Amenities", "Safety And Security", "Other"],
        default: "Room Issue"
    },
    description: { // Note the capital 'D' from your schema
        type: String,
    },
    room: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String, // URL to the image
        default: ''
    },
    status: { // <-- IMPORTANT ADDITION
        type: String,
        enum: ['OPEN', 'PENDING_MANUAL_REVIEW', 'RESOLVED'],
        // default: 'OPEN'
    }
}, { timestamps: true }); // This automatically adds createdAt and updatedAt

module.exports = mongoose.model('Ticket', ticketSchema);
// module.exports = mongoose.model('Projectnewdb', ticketSchema);