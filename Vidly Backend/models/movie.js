const mongoose = require("mongoose");
const Joi = require("joi");
const { genreSchema } = require("./genre");

function schemaValidation(movieObject) {
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number().required(),
    dailyRentalRate: Joi.number().required(),
  });

  return schema.validate(movieObject);
}

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: genreSchema, required: true },
  numberInStock: { type: Number, required: true },
  dailyRentalRate: { type: Number, required: true },
});

module.exports.schemaValidation = schemaValidation;
module.exports.movieSchema = movieSchema;
