const mongoose = require("mongoose");

// To establish a connection
mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://localhost/mongo-exercises")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error Occured: " + err.message));

// Create schema
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: Number,
});

// Create Document in Collection
const Course = mongoose.model("Course", courseSchema);

// Retrieve
async function getCourses() {
  const courses = await Course.find({
    isPublished: true,
    tags: "backend",
  })
    .sort({ name: 1 })
    .select({ name: 1, author: 1 });
  return courses;
}

async function run() {
  const result = await getCourses();
  console.log(result);
}

run();
