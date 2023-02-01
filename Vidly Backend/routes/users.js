const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { User, userSchema, userSchemaValidate } = require("../models/user");

router.post("/", async (req, res) => {
  const { error } = userSchemaValidate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const alreadyUser = await User.findOne({ email: req.body.email });
  if (alreadyUser) return res.status(400).send("User already registered");

  const user = new User(req.body);
  await user.save();
  res.send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
