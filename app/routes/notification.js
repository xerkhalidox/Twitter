const express = require('express');
const router = express.Router();
const notifications = require('../controllers/notification/notifications_API');
const { is_user } = require('../middlewares/is_authenticated');

router.get('/notifications', is_user, notifications);

module.exports = router;