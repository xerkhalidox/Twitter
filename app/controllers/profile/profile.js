const Tweet = require("../../models/tweet");
const Follow = require('../../models/follow');
const comment_promises = require("../../utils/comments_promises");
const merge = require("../../utils/merge_tweets_and_comments");

const is_followed = async (who, whom) => {
    if (who == whom) {
        return '';
    } else {
        const follow = await Follow.count({
            who_follow: who,
            follow_whom: whom
        });
        if (follow) {
            return 'Unfollow';
        } else {
            return 'Follow';
        }
    }
};

//fetch user tweets and comments on them.
const profile = async (req, res) => {
    user_id = req.params.userId;
    const follow_btn_value = await is_followed(req.user._id, user_id);
    const tweets = await Tweet
        .find({ user: user_id })
        .populate("user")
        .lean();
    const comments = await Promise.all(comment_promises(tweets));
    const merged = merge(tweets, comments);
    res.render("index/profile", { 'data': merged, 'Follow': follow_btn_value });
};
module.exports = profile;