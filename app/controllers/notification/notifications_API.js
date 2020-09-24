const Notification = require("../../models/notification");

const notifications_API = async (req, res) => {
    try {
        const notifications = await Notification.find({
            user: req.user._id,
            is_read: 0
        }).lean();
        res.render('index/notifications', { 'notifications': notifications });
    } catch (error) {
        res.render("errors/500");
    }
};

module.exports = notifications_API;