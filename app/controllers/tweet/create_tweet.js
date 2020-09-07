const Tweet = require('../../models/tweet');
const Hashtag = require("../../models/hashtag");
const { extract_hashtags, hashtag_promises } = require("../../utils/hashtags_helper");

const newTweet = async (req, res) => {
    try {
        const tweet = await Tweet.create(req.body);
        await tweet.save();
        const hashtags = extract_hashtags(req.body.tweet, tweet.id);
        if (hashtags.size) {
            await Promise.all(hashtag_promises(hashtags));
        }
        res.redirect('/');
    } catch (err) {
        console.log(err);
        res.render('errors/500');
    }
};
module.exports = newTweet;