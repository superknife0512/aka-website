const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    courseLink: String,
    eventLink: String,
})

module.exports = mongoose.model('AdminData', adminSchema);