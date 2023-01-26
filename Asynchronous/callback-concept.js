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
