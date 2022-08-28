const express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/User");

//register

router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    const user = await newUser.save();
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Login

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).json(" opps!!! Wrong Credentials");

    const validated = await bcrypt.compare(req.body.password, user.password);
    !validated && res.status(400).json(" opps!!! Wrong password");

    const { password, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
