const fs = require("node:fs");
const logger = require("./logger");

logger.greet("Akash");

fs.readdir("./", (err, files) => {
  if (err) console.log("Error", err);
  else console.log("Files: ", files);
});
