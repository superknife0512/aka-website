const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    imgUrls: [String],
    imgDesc: {type: String, required: true},
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
    posts:[ postSchema ],
},{timestamps: true})

module.exports = mongoose.model('Album', albumSchema);