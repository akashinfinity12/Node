const Joi = require("joi");
const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

function schemaValidation(object) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(10).required(),
  });
  return schema.validate(object);
}

module.exports.genreSchema = genreSchema;
module.exports.schemaValidation = schemaValidation;
