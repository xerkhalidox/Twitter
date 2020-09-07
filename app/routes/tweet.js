const new_tweet = require("../controllers/tweet/create_tweet");
const router = require('express').Router();
const { is_user } = require('../middlewares/is_authenticated');

router.post('/create', is_user, new_tweet);

module.exports = router;