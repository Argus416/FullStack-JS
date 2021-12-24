const express = require("express");
const router = express.Router();
const { Posts } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/posts", async (req, res) => {
    const posts = await Posts.findAll({
        order: [["id", "DESC"]],
    });
    return res.json(posts);
});

router.get("/post/:id", async (req, res) => {
    const id = req.params.id;
    const post = await Posts.findByPk(id);
    return res.json(post);
});

router.post("/post/create", validateToken, async (req, res) => {
    const post = req.body;
    await Posts.create(post);
    return res.json(post);
});

module.exports = router;
