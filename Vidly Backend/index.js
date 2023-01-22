const express = require("express");
const app = express();
const Joi = require("joi");

app.use(express.json());

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

app.delete("/api/genres/:id", (req, res) => {
  const genreObject = genres.find((e) => e.id === Number(req.params.id));
  if (!genreObject) return res.status(404).send("Genre object not found");

  const index = genres.indexOf(genreObject);
  genres.splice(index, 1);
  res.send(genres);
});

app.put("/api/genres/:id", (req, res) => {
  const genreObject = genres.find((e) => e.id === Number(req.params.id));
  if (!genreObject) return res.status(404).send("Genre object not found");

  const { error } = schemaValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const index = genres.indexOf(genreObject);
  genreObject.genre = req.body.genre;

  res.send(genreObject);
});

app.post("/api/genres", (req, res) => {
  const { error } = schemaValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = {
    id: genres.length + 1,
    genre: req.body.genre,
  };
  genres.push(genre);
  res.send(genre);
});

function schemaValidation(genre) {
  const schema = Joi.object({
    genre: Joi.string().min(3).max(10).required(),
  });

  return schema.validate(genre);
}

app.get("/", (req, res) => {
  res.send("Welcome to Vidly Backend Page");
});

app.get("/api/genres", (req, res) => {
  res.send(genres);
});

app.get("/api/genres/:id", (req, res) => {
  const genreObject = genres.find((e) => e.id === Number(req.params.id));
  if (!genreObject) return res.status(404).send("Genre object not found");
  res.send(genreObject);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}`));
