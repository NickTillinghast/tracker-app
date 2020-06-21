const mongoose = require('mongoose');

// communicates to mongoDb and will set up table

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

mongoose.model('User', userSchema);