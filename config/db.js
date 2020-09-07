const mongoose = require('mongoose');

const db_connection = async () => {
    try {
        const conn = await mongoose.connect(process.env.DATABASE_STRING,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            }, () => {
                console.log("MongoDB connected Successfully");
            });
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};
module.exports = db_connection;