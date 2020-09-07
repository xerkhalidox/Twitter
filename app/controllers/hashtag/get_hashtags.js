const Hashtag = require("../../models/hashtag");

//get top ten hashtags sorted by number of appears
const get_hashtags = async (req, res) => {
    try {
        const hashtags = await Hashtag
            .find()
            .sort({ "numberOfAppears": -1 })
            .limit(10)
            .lean();
        res.render("index/hashtags", { "hashtags": hashtags });
    } catch (err) {
        console.log(err);
        res.render("errors/500");
    }
};

module.exports = get_hashtags;