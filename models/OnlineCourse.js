const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: String,
    videoId: String,
    videoUrl: String,
    time: String,
    documentLink:{
        type: String
    },
}, {timestamps:true})

const onlineCourseSchema = new mongoose.Schema({
    title:{
        required: true,
        type: String
    },
    teacher:{
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
    },
    imageUrl:{
        required: true,
        type: String
    },
    documentLink:{
        type: String
    },
    videoId: String,
    blobName: String,
    courses: [courseSchema]
}, {timestamps:true})

module.exports = mongoose.model('Online-Course', onlineCourseSchema);

