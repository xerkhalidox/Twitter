const Comment = require('../models/comment');

const commment_promises = (tweets) => {
    let comments = [];
    for (let i = 0; i < tweets.length; i++) {
        comments.push(Comment
            .find({ tweet: tweets[i]._id })
            .populate('user')
            .lean());
    }
    return comments;
};

module.exports = commment_promises;