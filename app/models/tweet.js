const mongoose = require('mongoose');
const moment = require("moment");

const schema = mongoose.Schema({
    'tweet': String,
    'user': {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    'created_at': {
        type: Date,
        default: Date.now
    },

});
module.exports = mongoose.model('tweet', schema);