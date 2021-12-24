const express = require("express");
const router = express.Router();
const { Comments } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");
router.get("/post/:postID", async (req, res) => {
    const postID = req.params.postID;
    console.log(postID);
    const comments = await Comments.findAll({ where: { PostId: postID }, order: [["id", "DESC"]] });
    return res.json(comments);
});

router.post("/create", validateToken, async (req, res) => {
    const comment = req.body;
    const username = req.user.username;
    comment.username = username;
    console.log(comment);
    await Comments.create(comment);
    return res.json(comment);
});

module.exports = router;
