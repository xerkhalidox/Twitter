const Tweet = require("../../models/tweet");
const comment_promises = require("../../utils/comments_promises");
const merge = require("../../utils/merge_tweets_and_comments");

//fetch user tweets and comments on them.
const profile = async (req, res) => {
    user_id = req.params.userId;
    const tweets = await Tweet
        .find({ user: user_id })
        .populate("user")
        .lean();
    const comments = await Promise.all(comment_promises(tweets));
    const merged = merge(tweets, comments);
    res.render("index/profile", { 'data': merged });
};
module.exports = profile;