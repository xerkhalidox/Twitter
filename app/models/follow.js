const mongoose = require("mongoose");

const schema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    follower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
});

module.exports = mongoose.model('follower', schema);