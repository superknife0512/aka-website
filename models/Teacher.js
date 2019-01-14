const mongoose = require('mongoose');

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


    schedule:{
        't2.1': String,
        't2.2': String,
        't2.3': String,
        
        't3.1': String,
        't3.2': String,
        't3.3': String,
        
        't4.1': String,
        't4.2': String,
        't4.3': String,
        
        't5.1': String,
        't5.2': String,
        't5.3': String,
        
        't6.1': String,
        't6.2': String,
        't6.3': String,
        
        't7.1': String,
        't7.2': String,
        't7.3': String,
        
        'cn.1': String,
        'cn.2': String,
        'cn.3': String,
    },

    albums:[
        {type: mongoose.Schema.Types.ObjectId, ref: 'Album'}
    ],

    token: String,
    tokenExpiration: Date,
})

module.exports = mongoose.model('Teacher', teacherSchema);