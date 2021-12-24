const express = require("express");
const router = express.Router();
const { Comments } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { resetWatchers } = require("nodemon/lib/monitor/watch");
router.get("/post/:postID", async (req, res) => {
    const postID = req.params.postID;
    console.log(postID);
    const comments = await Comments.findAll({ where: { PostId: postID }, order: [["id", "DESC"]] });
    return res.json(comments);
});

router.post("/create", validateToken, async (req, res) => {
    const comment = req.body;
    const username = req.user.username;
    const id = req.user.id;
    comment.username = username;
    await Comments.create(comment);
    return res.json(comment);
});

router.delete("/delete/:commentId", validateToken, async (req, res) => {
    const commentId = req.params.commentId;
    Comments.destroy({ where: { id: commentId } });
    return res.json("comment deleted");
});

module.exports = router;
