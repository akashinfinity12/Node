console.log("Before");
setTimeout(() => {
  console.log("Reading a value from the database");
}, 2000);
console.log("After");

// JS is single threaded. SetTimeout is asynchronous method which gets scheduled and runs after line number 5
