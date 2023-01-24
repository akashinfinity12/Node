const express = require("express");
const app = express();
const logger = require("./logger");

app.use(express.json());

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
