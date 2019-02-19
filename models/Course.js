
const mongoose = require('mongoose');

const testimonialSchema = mongoose.Schema({
    facebookLink: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
})

const courseSchema =new mongoose.Schema({
    title:{
        required: true,
        type: String,
    },
    shortDes:{
        required:true,
        type: String
    },
    price:{
        required:true,
        type: String
    },
    oldPrice:{
        type: String
    },
    period:{
        required:true,
        type: String
    },
    learningSchedule:{
        required:true,
        type: String
    },
    courseImg: String,

    requirements:[{type: String}],

    courseGoals:[{type: String}],

    teacher:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Teacher',
    },
    assistant:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Teacher',
    },
    videoUrl: String,

    blobName: String,

    testimonials: [testimonialSchema]
},{timestamps: true})

module.exports = mongoose.model('Course', courseSchema);