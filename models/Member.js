const mongoose = require('mongoose');

const MemberSchema = mongoose.Schema({
    id: {
        type: Number,
        required:true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ["Male", "Female"],
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    domain: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        required: true
    }
});

const MemberModel = mongoose.model('Member', MemberSchema);

module.exports = MemberModel;
