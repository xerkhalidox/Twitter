const Follow = require('../../models/follow');
const User = require('../../models/user');

const follow_user = async (req, res) => {
    try {
        const who_will_follow = req.user;
        const follow_whom = req.params.userId;
        const user = User.findById(follow_whom);
        if (!user) {
            res.render('errors/404');
        }
        const new_relation = await Follow.create({
            who_follow: who_will_follow,
            follow_whom: follow_whom
        });
        await new_relation.save();
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
    }
};
module.exports = follow_user;