const Hashtag = require("../models/hashtag");

//convert hashtags to link by putting them in <a> tag.
const link_hashtags = (str) => {
    return str.replace(/#[A-Z]*/gi, (match) => {
        return `<a href="/trends/${match.substring(1)}">${match}</a>`;
    });
};

//extract hashtags from tweets and comments and store them in Map 
//hashtag is the key and count of appears is the value
const extract_hashtags = (str, id) => {
    let hashtags = new Map();
    str.replace(/#[A-Z]*/gi, (match) => {
        if (hashtags.get(match)) {
            hashtags.set(match, { numberOfAppears: hashtags.get(match) + 1, id: [...hashtags.get(match).id, id] });
        } else {
            hashtags.set(match, { numberOfAppears: 1, id: [id] });
        }
    });
    return hashtags;
};

//storing hashtags in database
const hashtag_promises = (hashtags) => {
    let hashtag_arr = [];
    for (let [key, value] of hashtags) {
        hashtag_arr.push((async () => {
            try {
                let _hashtag = await Hashtag.countDocuments({ hashtag: key });
                if (_hashtag) {
                    return await Hashtag.updateOne(
                        { hashtag: key },
                        { $push: { tweets: value.id } },
                        { $inc: { numberOfAppears: 1 } }
                    );
                } else {
                    let _hashtag = await Hashtag.create({
                        hashtag: key,
                        numberOfAppears: value.numberOfAppears,
                        tweets: value.id
                    });
                    return _hashtag.save();
                }
            }
            catch (err) {
                console.log(err);
            }
        })());
    }
    return hashtag_arr;
};
const remove_hash_symbol = (hashtag) => {
    return hashtag.substring(1);
};
module.exports = {
    link_hashtags,
    extract_hashtags,
    hashtag_promises,
    remove_hash_symbol,
};