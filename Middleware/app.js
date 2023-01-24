const express = require("express");
const app = express();
const logger = require("./logger");
const helmet = require("helmet");
const morgan = require("morgan");
const Joi = require("joi");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`env: ${app.get("env")}`);

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("morgan is enabled");
}

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
