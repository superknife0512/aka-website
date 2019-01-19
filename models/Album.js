const mongoose = require('mongoose');

const imgsetSchema = mongoose.Schema({
    imgUrls: [String],
    imgDesc: {type: String, required: true},
    imgTitle: {type: String, required: true},
})

const albumSchema = mongoose.Schema({
    name:{
        required: true,
        type: String,
    },
    shortDes:{
        required: true,
        type: String,
    },
    createBy: {type: mongoose.Schema.Types.ObjectId, ref: 'Teacher'},
    imgset:[ imgsetSchema ],
},{timestamps: true})

module.exports = mongoose.model('Album', albumSchema);