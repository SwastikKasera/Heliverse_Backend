const mongoose = require("mongoose");

const TeamSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    teamMembers: [{
        id:{
            type: Number
        }
    }]
});

const Team = mongoose.model('Team', TeamSchema);
module.exports = Team;
