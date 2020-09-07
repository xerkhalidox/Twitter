const mongoose = require('mongoose');


const schema = mongoose.Schema({
    google_id: String,
    name: String,
    img: String,
});
module.exports = mongoose.model('user', schema);  