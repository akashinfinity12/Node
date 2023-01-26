// Replacing callbacks in callback-concept.js into promises

console.log("Before");
getUser(1)
  .then((item) => getRepositories(item.name))
  .then((item) => console.log(item))
  .catch((err) => console.log("Error Occured"));
console.log("After");

function getUser(id) {
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

function getRepositories(username) {
  return new Promise((resolve, request) => {
    setTimeout(() => {
      console.log(`Fetching ${username}'s repository list..`);
      resolve(["Java", "Node", "YUGMA-B2C-APP"]);
    }, 2000);
  });
}
