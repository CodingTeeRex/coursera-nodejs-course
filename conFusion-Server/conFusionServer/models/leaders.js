const mongoose = require('mongoose');
const schema = mongoose.Schema;

const leaderSchema = new schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    featured: {
        type: Boolean,
        default: false
    }
});

const Leaders = mongoose.model('Leader', leaderSchema);

module.exports = Leaders;