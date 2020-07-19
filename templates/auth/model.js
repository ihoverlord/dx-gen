const mongoose = require('mongoose');
const uuid = require('uuid');

const userSchema = new mongoose.Schema({
    email: {
        type: String, 
        required: true,
        index: true,
        unique: true
    },
    username: { 
        type: String
    },
    password: { 
        type: String, 
        required: true
    },
    userId: {
        type: String,
        default: uuid.v4()
    }
}, { timestamps: true });


module.exports = mongoose.model('user', userSchema);