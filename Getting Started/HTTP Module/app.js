const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("Hello World");
    res.end();
  }

  if (req.url === "/api/customers") {
    res.write(JSON.stringify(["akash", "aman", "avinash"]));
    res.end();
  }
});

server.listen(3000);

console.log("Listening to port 3000");
