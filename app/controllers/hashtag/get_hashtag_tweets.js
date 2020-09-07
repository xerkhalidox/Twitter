const Hashtag = require('../../models/hashtag');
const get_hashtag_tweets = async (req, res) => {
    console.log(req.params.hashtag);
    const tweets = await Hashtag
        .find({ hashtag: '#' + req.params.hashtag })
        .populate('tweet')
        .lean();
    console.log(tweets);
};
module.exports = get_hashtag_tweets;