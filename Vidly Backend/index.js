const express = require("express");
const app = express();
const genres = require("./routes/genres");
const mongoose = require("mongoose");

// connection
mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://localhost/cinema")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error: " + err));

app.use(express.json());
app.use("/api/genres", genres);

app.get("/", (req, res) => {
  res.send("Welcome to Vidly Backend Page");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}`));
