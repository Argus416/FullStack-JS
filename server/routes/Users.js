const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/users", async (req, res) => {
    const users = await Users.findAll();
    return res.json(users);
});

router.post("/user/create", async (req, res) => {
    const { username, password } = req.body;
    const user = await Users.findOne({ where: { username: username } });
    if (user) {
        return res.json("user already exist");
    } else {
        bcrypt.hash(password, 10).then((hash) => {
            Users.create({ username: username, password: hash });
        });
        return res.json("success");
    }
});

router.post("/user/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await Users.findOne({ where: { username: username } });

    if (user) {
        bcrypt.compare(password, user.password).then((match) => {
            if (match) {
                const accessToken = sign({ username: user.username, id: user.id }, "secret");
                res.json({ accessToken: accessToken, username: user.username, id: user.id });
            } else {
                res.json({ error: "Wrong password" });
            }
        });
    } else {
        return res.json({ error: "User dosen't exist" });
    }
});

router.get("/user/auth", validateToken, (req, res) => {
    console.log(validateToken);
    res.json(req.user);
});

module.exports = router;
