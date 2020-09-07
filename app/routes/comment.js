const create_comment = require("../../app/controllers/comment/create_comment");
const router = require("express").Router();


router.post("/comment", create_comment);

module.exports = router;