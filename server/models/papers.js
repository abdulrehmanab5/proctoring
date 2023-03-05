const mongoose = require('mongoose')
const { default: isURL } = require('validator/lib/isurl')
const { url } = require('../utils/cloudinary')

const { Schema } = mongoose

const paperSchema = new Schema({
    student: {
        type: Schema.Types.ObjectId,
        ref: 'student'
    },
    subject: {
        type: Schema.Types.ObjectId,
        ref: 'subject'
    },
    exam: {
        type: String,
        required:true
    },
    // marks: {
    //     type: Number,
        
    // },
    // uploadpaper: {
    //     type: Number,
     
    // },
    department: {
        type:String
    },
    semester: {
        type:Number
    },
    section: {
        type:String
    }
})

module.exports = mongoose.model('papers', paperSchema)
