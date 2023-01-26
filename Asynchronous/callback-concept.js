// Callback

console.log("Before");
getUser(1, (item) => {
  console.log(item);
  getRepositories(item.name, (e) => {
    console.log("Repositories: " + e);
  });
});
console.log("After");

function getUser(id, callback) {
  setTimeout(() => {
    console.log(`Reading user ${id} data from the database..`);
    const userInformation = {
      name: "Akash",
      interests: ["Computer Science, Math"],
    };
    callback(userInformation);
  }, 2000);
}

function getRepositories(username, callback) {
  setTimeout(() => {
    console.log(`Fetching ${username}'s repository list..`);
    callback(["Java", "Node", "YUGMA-B2C-APP"]);
  }, 2000);
}

/*

This code snippet is very important in understanding async concept and why we require callbacks, async-await and promises

console.log("Before");
const user = getUser(1);
console.log(user);
console.log("After");

function getUser(id) {
  setTimeout(() => {
    console.log(`Reading user ${id} data from the database..`);
    const userInformation = {
      name: "Akash",
      interests: ["Computer Science, Math"],
    };
    return userInformation;
  }, 2000);
}

*/
