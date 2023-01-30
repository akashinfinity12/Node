const mongoose = require("mongoose");
const Joi = require("joi");

function userSchemaValidate(userObject) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(3).max(255).required(),
    password: Joi.string().min(8).max(255).required(),
  });

  return schema.validate(userObject);
}

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 50 },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 255,
  },
  password: { type: String, required: true, minlength: 8, maxlength: 1024 },
});

const User = mongoose.model("User", userSchema);

module.exports.userSchemaValidate = userSchemaValidate;
module.exports.userSchema = userSchema;
module.exports.User = User;
