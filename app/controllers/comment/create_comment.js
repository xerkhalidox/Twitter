const Comment = require("../../models/comment");

const create_comment = async (req, res) => {
    try {
        //if commnet is not empty
        if (req.body.comment.length > 0) {
            const new_comment = await Comment.create(req.body);
            await new_comment.save();
        }
        res.redirect('/');
    } catch (err) {
        console.log(err);
        res.render('errors/500');
    }

};
module.exports = create_comment;