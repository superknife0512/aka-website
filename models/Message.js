
const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    name:{
        required: true,
        type: String,
    },
    email:{
        required: true,
        type: String,
    },
    phone:{
        required: true,
        type: String,
    },
    message:{
        required: true,
        type: String,
    },
})

module.exports = mongoose.model('Message', messageSchema);