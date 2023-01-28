const Joi = require("joi");
const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  isGold: { type: Boolean, required: true },
});

function schemaValidation(object) {
  const schema = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required().min(10).max(10),
    isGold: Joi.boolean().required(),
  });
  return schema.validate(object);
}

function putSchemaValidation(object) {
  const schema = Joi.object({
    name: Joi.string(),
    phone: Joi.string().min(10).max(10),
    isGold: Joi.boolean(),
  });
  return schema.validate(object);
}

module.exports.customerSchema = customerSchema;
module.exports.schemaValidation = schemaValidation;
module.exports.putSchemaValidation = putSchemaValidation;
