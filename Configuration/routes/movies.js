const express = require("express");
const router = express.Router();

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

router.get("/", (req, res) => {
  res.send(movies);
});

router.post("/", (req, res) => {
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

module.exports = router;
