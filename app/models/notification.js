const mongoose = require("mongoose");

const schema = mongoose.Schema({
    "notification": String,
    "user": {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    "is_read": {
        type: Boolean,
        default: 0
    },
    "time": {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("notification", schema);