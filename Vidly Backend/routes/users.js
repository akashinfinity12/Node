const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, userSchema, userSchemaValidate } = require("../models/user");

router.post("/", async (req, res) => {
  const { error } = userSchemaValidate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const alreadyUser = await User.findOne({ email: req.body.email });
  if (alreadyUser) return res.status(400).send("User already registered");

  const user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  res.send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
