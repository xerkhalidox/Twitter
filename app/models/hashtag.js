const mongoose = require("mongoose");

const schema = mongoose.Schema({
    "hashtag": String,
    "numberOfAppears": Number,
    "tweets": [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "tweet"
    }],
    "first_appears": {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("hashtag", schema);