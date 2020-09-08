const router = require('express').Router();
const { is_user } = require('../middlewares/is_authenticated');
const { get_following_tweets } = require('../controllers/tweet/get_tweets');
const profile = require('../controllers/profile/profile');
const hashtags = require("../controllers/hashtag/get_hashtags");
const hashtag = require('../controllers/hashtag/get_hashtag_tweets');
router.get('/', is_user, get_following_tweets);
router.get('/:userId/profile', profile);
router.get('/trends', hashtags);
router.get('/trends/:hashtag', hashtag);
module.exports = router;
