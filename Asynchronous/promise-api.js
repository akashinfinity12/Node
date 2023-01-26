const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("Calling Google API");
    resolve({ message: "Google Data received" });
  }, 2000);
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("Calling Facebook API");
    resolve({ message: "Facebook Data received" });
  }, 2000);
});

Promise.all([p1, p2])
  .then((item) => console.log(item))
  .catch((err) => console.log(err.message));
