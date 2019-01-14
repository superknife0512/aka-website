
const mongoose = require('mongoose');

const testimonialSchema = mongoose.Schema({
    linkFacebook: String,
    Desc: String,
    Name: String, 
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
    requirements:[{type: String}],
    courseGoals:[{type: String}],
    teacher:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Teacher',
    },
    videoUrl: String,
    testimonials: [testimonialSchema]
})

module.exports = mongoose.model('Course', courseSchema);