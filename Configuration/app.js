const express = require("express");
const app = express();
const logger = require("./logger");
const Joi = require("joi");
const config = require("config");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log(`App Name: ${config.get("name")}`);
console.log(`Mail Host Name: ${config.get("mail.host")}`);
console.log(`Hidden Password: ${config.get("mail.password")}`);

const movies = [
  {
    id: 1,
    name: "Jurassic Park",
  },
  {
    id: 2,
    name: "Sita Ramam",
  },
];

app.use(logger);

app.get("/api/movies", (req, res) => {
  res.send(movies);
});

app.post("/api/movies", (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
  });

  const result = schema.validate(req.body);
  if (result.error) {
    return res.status(400).send("Bad Request");
  } else {
    const movie = {
      id: movies.length + 1,
      name: req.body.name,
    };
    movies.push(movie);
    return res.send(movies);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}`));
