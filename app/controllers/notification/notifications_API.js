const Notification = require("../../models/notification");

const notifications_API = async (req, res) => {
    try {
        const notifications = await Notification.find({
            user: req.user,
            is_read: 0
        }).exec();
        res.json(notifications);
    } catch (error) {
        res.render("errors/500");
    }
};

module.exports = notifications_API;