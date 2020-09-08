const Hashtag = require('../../models/hashtag');

const get_hashtag_tweets = async (req, res) => {
    try {
        const tweets = await Hashtag
            .find({ hashtag: '#' + req.params.hashtag })
            .populate({
                path: 'tweets',
                populate: { path: 'user' }
            })
            .lean();
        res.render('index/hashtag', { 'tweets': tweets[0].tweets });
    } catch (err) {
        console.log(err);
        res.render('errors/500');
    }
};
module.exports = get_hashtag_tweets;