const mongoose = require('mongoose');

const imgsetSchema = mongoose.Schema({
    imgUrls: [String],
    imgDesc: {type: String, required: true},
})

const albumSchema = mongoose.Schema({
    name:{
        required: true,
        type: String,
    },
    shortDesc:{
        required: true,
        type: String,
    },
    imgset:[ imgsetSchema ],
})

module.exports = mongoose.model('Album', albumSchema);