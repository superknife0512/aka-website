const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    email:{
        type:String,
        required: true,
    },
    password:{
        type:String,
        required: true,
    },
    name:{
        type:String,
        required: true,
    },
    specialty:{
        type: String,
        required:true
    },

    story:{
        type: String,
        required: true,
    },

    teacherCode:{
        type: String,
    },

    teacherImgs:[{
        type: String,
    }],

    avatar:{
        type: String,
        default: 'public/teacherData/avatar/default.png',
    },

    courses:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Course'
    }],

    teacherFeedback: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TeacherFeedback'
    }]
})

module.exports = mongoose.model('Teacher', teacherSchema);