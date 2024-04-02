const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    team:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Team"
    }]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
