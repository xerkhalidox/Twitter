//merge comments that belong to tweet
//to display it easily on homepage
const merge = (tweets, comments) => {
    const item = (tweet, comment) => {
        return {
            tweet: tweet,
            comment: comment
        };
    };
    let merged_arr = [];
    let i = comments.length;
    tweets.forEach((tweet, index) => {
        if (index < i) {
            merged_arr.push(item(tweet, comments[index]));
        } else {
            merged_arr.push(item(tweet, []));
        }
    });
    return merged_arr;
};

module.exports = merge;