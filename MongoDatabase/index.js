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
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Calculus",
    author: "Michael Spivak",
    tags: ["Math", "Calculus"],
    isPublished: true,
  });
  const result = await course.save();
  console.log(result);
}

async function getCourses() {
  const courses = await Course.find().limit(10).select({ name: 1, author: 1 });
  console.log("Retrieved Data:\n" + courses);
}

getCourses();
// createCourse();
