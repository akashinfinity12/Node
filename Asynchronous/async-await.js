// ASYNC AWAIT METHOD
console.log("Before");
async function displayOperation() {
  const user = await getUser(1);
  console.log(user);
  const repositories = await getRepositories(user.name);
  console.log(repositories);
}
displayOperation();
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
