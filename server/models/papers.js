const mongoose = require('mongoose')
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
    marks: {
        type: Number,
        default: 60
    },
    totalMarks: {
        type: Number,
        default: 100
    },
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

module.exports = mongoose.model('paper', paperSchema)
