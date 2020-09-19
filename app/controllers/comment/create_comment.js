const Comment = require("../../models/comment");
const Notification = require("../../models/notification");

const create_comment = async (req, res) => {
    try {
        //if commnet is not empty
        if (req.body.comment.length > 0) {
            const new_comment = await Comment.create(req.body);
            await new_comment.save();
        }
        const new_notification = await Notification.create({
            notification: `${req.user.name} has commented on your tweet ${req.body.tweet}`,
            user: req.user
        });
        new_notification.save();
        res.redirect('/');
    } catch (err) {
        console.log(err);
        res.render('errors/500');
    }

};
module.exports = create_comment;