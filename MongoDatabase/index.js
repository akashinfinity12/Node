const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://localhost/playground")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Some error occured: " + err.message);
  });

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  price: Number,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Elements of Algebra",
    author: "Euler",
    price: 800,
    tags: ["Math", "Algebra"],
    isPublished: true,
  });
  const result = await course.save();
  console.log(result);
}

async function getCourses() {
  const courses = await Course.find().limit(10).select({ name: 1, author: 1 });
  // const courses = await Course.find({ price: { $gte: 500 } }).limit(10);
  // const courses = await Course.find({ author: /^Euler/ });
  console.log("Retrieved Data:\n" + courses);
}

getCourses();
// createCourse();
