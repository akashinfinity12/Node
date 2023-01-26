const express = require("express");
const app = express();
const logger = require("./logger");
const Joi = require("joi");
const config = require("config");
const debug = require("debug")("app:landing");
const morgan = require("morgan");
const movies = require("./routes/movies");

app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/movies", movies);

console.log(`App Name: ${config.get("name")}`);
console.log(`Mail Host Name: ${config.get("mail.host")}`);
console.log(`Hidden Password: ${config.get("mail.password")}`);

if (app.get("env") === "production") {
  app.use(morgan("tiny"));
  debug("Connected to website logging");
}

app.use(logger);

app.get("/", (req, res) => {
  res.render("index.pug", {
    message: "Hello World. This is PUG usage",
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}`));
