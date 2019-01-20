const mongoose = require('mongoose');

scheduleSchema = new mongoose.Schema({
        t21: String,
        t22: String,
        t23: String,
        
        t31: String,
        t32: String,
        t33: String,
        
        t41: String,
        t42: String,
        t43: String,
        
        t51: String,
        t52: String,
        t53: String,
        
        t61: String,
        t62: String,
        t63: String,
        
        t71: String,
        t72: String,
        t73: String,
        
        cn1: String,
        cn2: String,
        cn3: String,
})

const teacherSchema = new mongoose.Schema({
    email:{
        type:String,
        required: true,
        unique: true,
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
    },

    story:{
        type: String,
    },

    teacherVideo:[{
        type: String,
    }],
    
    avatar:{
        type: String,
        default: 'public/teacherData/avatar/default.png',
    },
    
    role:{
        type: String,
    },

    roleCode:{
        type: String
    },

    schedule: [scheduleSchema],

    token: String,
    tokenExpiration: Date,
})

module.exports = mongoose.model('Teacher', teacherSchema);