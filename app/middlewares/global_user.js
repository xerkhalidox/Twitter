//add logined user info to res since Handlebars doesn't allow
//to access it this way user.property_name 
const global_user = (req, res, next) => {
    res.locals.user_id = req.user._id || null;
    res.locals.name = req.user.name || null;
    res.locals.img = req.user.img || null;
    next();
};
module.exports = global_user;