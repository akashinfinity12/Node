const express = require("express");
const router = express.Router();
const config = require("config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const _ = require("lodash");
const { User } = require("../models/user");

function loginSchemaValidate(loginInfo) {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(255),
  });

  return schema.validate(loginInfo);
}

router.post("/", async (req, res) => {
  const { error } = loginSchemaValidate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const alreadyUser = await User.findOne({ email: req.body.email });
  if (!alreadyUser) return res.status(404).send("Invalid Email or Password");

  const isValid = await bcrypt.compare(req.body.password, alreadyUser.password);
  if (!isValid) return res.status(404).send("Invalid Email or Password");

  const token = jwt.sign({ _id: alreadyUser._id }, config.get("jwtPrivateKey"));
  res.send(token);
});

module.exports = router;
