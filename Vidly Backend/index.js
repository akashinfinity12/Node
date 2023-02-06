const express = require("express");
require("express-async-errors");
const app = express();
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const auth = require("./routes/auth");
const error = require("./middleware/error");
const mongoose = require("mongoose");
const config = require("config");

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL Error: jwtPrivateKey is not defined");
  process.exit(1);
}

// connection
mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://localhost/cinema")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error: " + err));

// middleware
app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use(error);

app.get("/", (req, res) => {
  res.send("Welcome to Vidly Backend Page");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}`));
