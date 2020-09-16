const mongoose = require("mongoose");

const schema = mongoose.Schema({
    who_follow: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    follow_whom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
});

module.exports = mongoose.model('follower', schema);