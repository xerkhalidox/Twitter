//Two middlewares to ensure user is logined in or not


//enusre user is not logined in
const is_guest = (req, res, next) => {
    if (req.user) {
        res.redirect('/');
    } else {
        next();
    }
};

//ensure user is logined in
const is_user = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
};
module.exports = { is_guest, is_user };