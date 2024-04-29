const mongoose = require('mongoose');
const placementSchema = new mongoose.Schema({
    company: String,
    position: String,
    location: String,
    date: Date,
    eligibility: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
});
module.exports = mongoose.model('Placement', placementSchema);
