const winston = require("winston");

function errorHandling(error, req, res, next) {
  winston.error(error.message, error);
  res.status(500).send("Something went wrong");
}

module.exports = errorHandling;
