const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send(`Hello World. I'm using the express framework. It's easy.`);
});

app.get("/api/courses", (req, res) => {
  res.send([
    {
      name: "Applied Mathematics",
      code: "MA201",
    },
    {
      name: "Discrete Mathematics",
      code: "MA202",
    },
  ]);
});

app.listen(3000, () => {
  console.log("Listening to port 3000");
});
