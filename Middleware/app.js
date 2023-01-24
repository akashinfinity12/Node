const express = require("express");
const app = express();
const logger = require("./logger");
const helmet = require("helmet");
const morgan = require("morgan");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("tiny"));

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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}`));
