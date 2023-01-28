const express = require("express");
const router = express.Router();
const Joi = require("joi");
const mongoose = require("mongoose");

// schema
const genreSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

// create collection
const Genre = mongoose.model("Genre", genreSchema);

function schemaValidation(object) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(10).required(),
  });

  return schema.validate(object);
}

router.get("/", async (req, res) => {
  const genres = await Genre.find();
  res.send(genres);
});

router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) return res.status(404).send("Genre object not found");
  res.send(genre);
});

router.post("/", async (req, res) => {
  const { error } = schemaValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = new Genre(req.body);
  const result = await genre.save();
  res.send(result);
});

router.put("/:id", async (req, res) => {
  const genreObject = await Genre.findById(req.params.id);
  if (!genreObject) return res.status(404).send("Genre object not found");

  const { error } = schemaValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  genreObject.set(req.body);
  const result = await genreObject.save();
  res.send(result);
});

router.delete("/:id", async (req, res) => {
  const genreObject = await Genre.findById(req.params.id);
  if (!genreObject) return res.status(404).send("Genre object not found");

  const result = await Genre.deleteOne({ _id: req.params.id });
  res.send(result);
});

module.exports = router;
