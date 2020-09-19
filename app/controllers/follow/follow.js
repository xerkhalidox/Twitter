const Follow = require('../../models/follow');
const User = require('../../models/user');
const Notification = require('../../models/notification');

const follow_user = async (req, res) => {
    try {
        const who_will_follow = req.user;
        const follow_whom = req.params.userId;
        const user = await User.findById(follow_whom).exec();
        if (!user) {
            res.render('errors/404');
        }
        console.log(user);
        const new_relation = await Follow.create({
            who_follow: who_will_follow,
            follow_whom: follow_whom
        });
        await new_relation.save();
        const new_notification = await Notification.create({
            notification: `${user.name} has followed you`,
            user: follow_whom
        });
        new_notification.save();
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
    }
};
module.exports = follow_user;