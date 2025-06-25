const mongoose = require('mongoose');

const studentRecSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    age: {
        type: Number,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});


const StudentRec = mongoose.model('StudentRec', studentRecSchema);
module.exports = StudentRec;