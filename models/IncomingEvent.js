const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    dateHappen: String,
    eventName: {
        type: String,
        required: true,
    },
    Desc:[String],
    eventImgs: [String],
}, {timestamps: true})

module.exports = mongoose.model('IncomingEvent', eventSchema);