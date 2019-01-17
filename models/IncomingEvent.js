const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    dateHappen: String,
    eventName: {
        type: String,
        required: true,
    },
    desc:[String],
    eventImg: String,
}, {timestamps: true})

module.exports = mongoose.model('IncomingEvent', eventSchema);