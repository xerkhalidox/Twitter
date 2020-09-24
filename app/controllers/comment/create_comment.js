const Comment = require("../../models/comment");
const Notification = require("../../models/notification");
const Tweet = require("../../models/tweet");

const create_comment = async (req, res) => {
    try {
        //if commnet is not empty
        if (req.body.comment.length > 0) {
            const new_comment = await Comment.create(req.body);
            await new_comment.save();
        }
        const { user } = await Tweet
            .findById(req.body.tweet)
            .populate('user')
            .exec();

        if (user._id != req.user._id) {
            console.log("yes");
            const new_notification = await Notification.create({
                notification: `<a href='/${req.user._id}/profile'>${req.user.name}</a> has commented on your <a href="/${req.body.tweet}">tweet</a>`,
                user: user._id
            });
            new_notification.save();
        }
        res.redirect('/');
    } catch (err) {
        console.log(err);
        res.render('errors/500');
    }

};
module.exports = create_comment;

