// Replacing callbacks in callback-concept.js into promises

console.log("Before");
getUser(1, (item) => {
  console.log(item);
  getRepositories(item.name, (e) => {
    console.log("Repositories: " + e);
  });
});
console.log("After");

function getUser(id, callback) {
  return new Promise((resolve, request) => {
    setTimeout(() => {
      console.log(`Reading user ${id} data from the database..`);
      const userInformation = {
        name: "Akash",
        interests: ["Computer Science, Math"],
      };
      resolve(userInformation);
    }, 2000);
  });
}

function getRepositories(username, callback) {
  return new Promise((resolve, request) => {
    setTimeout(() => {
      console.log(`Fetching ${username}'s repository list..`);
      resolve(["Java", "Node", "YUGMA-B2C-APP"]);
    }, 2000);
  });
}
