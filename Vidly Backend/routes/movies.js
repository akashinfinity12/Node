const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { schemaValidation, movieSchema } = require("../models/movie");
const { Genre } = require("../models/genre");

const Movie = mongoose.model("Movie", movieSchema);

router.get("/", async (req, res) => {
  const movies = await Movie.find();
  if (!movies) return res.status(404).send("Movie not found");
  res.send(movies);
});

router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) return res.status(404).send("Movie not found");
  res.send(movie);
});

router.post("/", async (req, res) => {
  const { error } = schemaValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid Genre");

  const movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre.id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });
  const result = await movie.save();
  res.send(result);
});

router.put("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) return res.status(404).send("Movie not found");

  const genre = undefined;
  if (req.body.genreId) {
    genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send("Genre not found");
  }

  // best way
  const result = await Movie.updateOne({ _id: req.params.id }, req.body);
  res.send(result);
});

router.delete("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) return res.status(404).send("Movie not found");

  const result = await Movie.deleteOne({ _id: req.params.id });
  res.send(result);
});

module.exports = router;
module.exports.Movie = Movie;
