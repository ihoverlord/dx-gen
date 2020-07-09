const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String, 
        required: true,
        index: true,
        unique: true
    },
    name: { 
        type: String
    },
    password: { 
        type: String, 
        required: true
    }
}, { timestamps: true });


module.exports = mongoose.model('user', userSchema);