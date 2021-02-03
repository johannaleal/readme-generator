// DEPENDENCIES ===============================
// built in node packages
const fs = require('fs');
// npm packages
const inquirer = require('inquirer');

// DATA =======================================

// FUNCTIONS ==================================
const writeUserInfo = (userResponses) => {
  console.log(userResponses.username);
  // build a string with user responses
  const text = `Your name is ${userResponses.username}`
  // write it to a file
  fs.writeFile("readme.md", text, (err) => err ? console.error(err) : console.log("success"));
}

// USER INTERACTIONS ==========================
// ask the user some questions
inquirer
  .prompt([
    // what is your name?
    {
      type: "input",
      name: "username",
      message: "What is your name?"
    }
    // what languages do you know?
    // what is your preferred method of communication
  ])
  .then(response => {
    writeUserInfo(response);
  })