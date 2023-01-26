// Promise is an object that holds the eventual result of an asynchronous operation

const p = new Promise((resolve, reject) => {
  // resolve(1);
  reject(new Error("API Error"));
});

p.then((e) => {
  console.log("Value is " + e);
}).catch((e) => {
  console.log("Error: " + e.message);
});
