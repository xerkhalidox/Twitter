const mongoose = require('mongoose');

const schema = mongoose.Schema({
    comment: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    tweet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tweet'
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('comment', schema);