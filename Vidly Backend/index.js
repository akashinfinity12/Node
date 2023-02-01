const express = require("express");
const app = express();
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const mongoose = require("mongoose");

// connection
mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://localhost/cinema")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error: " + err));

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);

app.get("/", (req, res) => {
  res.send("Welcome to Vidly Backend Page");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}`));
