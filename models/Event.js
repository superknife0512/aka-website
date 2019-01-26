const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    dateHappen: String,
    eventName: {
        type: String,
        required: true,
    },
    desc:[String],
    eventImgs: [String],
    blobNames:[String],
}, {timestamps: true})

module.exports = mongoose.model('Event', eventSchema);