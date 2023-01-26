const express = require("express");
const router = express.Router();
const Joi = require("joi");

const genres = [
  {
    id: 1,
    genre: "Sci-Fi",
  },
  {
    id: 2,
    genre: "Romance",
  },
  {
    id: 3,
    genre: "Comedy",
  },
];

function schemaValidation(genre) {
  const schema = Joi.object({
    genre: Joi.string().min(3).max(10).required(),
  });

  return schema.validate(genre);
}

router.get("/", (req, res) => {
  res.send(genres);
});

router.get("/:id", (req, res) => {
  const genreObject = genres.find((e) => e.id === Number(req.params.id));
  if (!genreObject) return res.status(404).send("Genre object not found");
  res.send(genreObject);
});

router.post("/", (req, res) => {
  const { error } = schemaValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = {
    id: genres.length + 1,
    genre: req.body.genre,
  };
  genres.push(genre);
  res.send(genre);
});

router.put("/:id", (req, res) => {
  const genreObject = genres.find((e) => e.id === Number(req.params.id));
  if (!genreObject) return res.status(404).send("Genre object not found");

  const { error } = schemaValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const index = genres.indexOf(genreObject);
  genreObject.genre = req.body.genre;

  res.send(genreObject);
});

router.delete("/:id", (req, res) => {
  const genreObject = genres.find((e) => e.id === Number(req.params.id));
  if (!genreObject) return res.status(404).send("Genre object not found");

  const index = genres.indexOf(genreObject);
  genres.splice(index, 1);
  res.send(genres);
});

module.exports = router;
