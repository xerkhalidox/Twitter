const login_page = (req, res) => {
    res.render('index/login', { layout: 'login_layout' });
};

module.exports = login_page;