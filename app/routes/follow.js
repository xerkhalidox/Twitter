const express = require('express');
const router = express.Router();
const follow_user = require('../controllers/follow/follow');
const unfollow_user = require('../controllers/follow/unfollow');
const { is_user } = require('../middlewares/is_authenticated');

router.post('/:userId', is_user, follow_user);
router.delete('/:userId', is_user, unfollow_user);

module.exports = router;

