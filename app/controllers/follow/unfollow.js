const Follow = require('../../models/follow');

const unfollow_user = async (req, res) => {
    try {
        const who_will_unfollow = req.user;
        const unfollow_whom = req.params.userId;
        const user = await Follow.find({
            follow_whom: unfollow_whom
        });
        if (!user) {
            res.render('errors/404');
        }
        await Follow.deleteOne({
            who_follow: who_will_unfollow,
            follow_whom: unfollow_whom
        });
        res.sendStatus(202);
    } catch (err) {
        console.log(err);
        res.render('errors/500');
    }
};
module.exports = unfollow_user;