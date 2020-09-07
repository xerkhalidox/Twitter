const Tweet = require("../../models/tweet");
const commment_promises = require("../../utils/comments_promises");
const merge = require("../../utils/merge_tweets_and_comments");
const Hashtag = require("../../models/hashtag");

//fetch tweets and comments on them and sort them by date
const get_following_tweets = async (req, res) => {
    try {
        const tweets = await Tweet
            .find()
            .sort({ "created_at": -1 })
            .populate('user')
            .lean();
        const comments = await Promise.all(commment_promises(tweets));
        //merge comments with their tweets
        const merged = merge(tweets, comments);
        const hashtags = await Hashtag
            .find()
            .sort({ "numberOfAppears": -1 })
            .limit(10)
            .lean();
        res.render("index/home", { "tweets": tweets, "data": merged, "hashtags": hashtags });
    } catch (err) {
        console.log(err);
        res.render("errors/500");
    }
};
module.exports = { get_following_tweets };