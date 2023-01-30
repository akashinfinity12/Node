const express = require("express");
const router = express.Router();
const { User, userSchema, userSchemaValidate } = require("../models/user");

router.post("/", async (req, res) => {
  const { error } = userSchemaValidate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = new User(req.body);
  const result = await user.save();
  res.send(result);
});
