const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
});

const Author = mongoose.model("Author", authorSchema);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    author: {
      type: [authorSchema],
      required: true,
    },
  })
);

async function createCourse(name, authors) {
  const course = new Course({
    name,
    author: authors,
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

async function updateCourse(courseId) {
  const course = await Course.updateOne(
    { _id: courseId },
    {
      $set: {
        author: {
          name: "mosh hamedani",
        },
      },
    }
  );
}

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.author.push(author);
  course.save();
}

async function deleteAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.author.id(authorId);
  author.remove();
  course.save();
}

// createCourse("Node Course", [new Author({ name: "Mosh" })]);
// addAuthor("63d54d1cbaaec2e01ec5cb32", new Author({ name: "akash" }));
deleteAuthor("63d54d1cbaaec2e01ec5cb32", "63d54d80409a5966ca4a8813");
