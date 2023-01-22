const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

const courses = [
  {
    courseId: "1",
    name: "Applied Mathematics",
    code: "MA201",
  },
  {
    courseId: "2",
    name: "Discrete Mathematics",
    code: "MA202",
  },
];

app.get("/", (req, res) => {
  res.send(`Hello World. I'm using the express framework. It's easy.`);
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.post("/api/courses", (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(20).required(),
    code: Joi.string().length(5),
  });

  const result = schema.validate(req.body);

  if (result.error) res.status(400).send(result.error.details[0].message);

  const course = {
    courseId: (courses.length + 1).toString(),
    name: req.body.name,
    code: req.body.code,
  };
  courses.push(course);
  res.send(course);
});

app.get("/api/courses/:id", (req, res) => {
  const response = courses.filter((item) => item.courseId == req.params.id);
  if (response.length > 0) res.send(response);
  else res.status(404).send("The course with the given id not found");
});

app.get("/api/practice/:id", (req, res) => {
  res.send(req.params.id);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
