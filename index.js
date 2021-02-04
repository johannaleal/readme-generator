// DEPENDENCIES ===============================

// Built in node and npd packages
const fs = require('fs');
const inquirer = require('inquirer');

// DATA =======================================

// List of prompts
const questions = [
    // What is your project title?
    {
        type: "input",
        name: "title",
        message: "What is your project title?"
    },
    // What is your project description?
    {
        type: "input",
        name: "description",
        message: "Please enter your project description."
    },
    // Enter installation instructions.
    {
        type: "input",
        name: "installation",
        message: "Please enter your project installation instructions."
    },
    // Enter usage information.
    {
        type: "input",
        name: "usage",
        message: "Please enter your project usage information."
    },
    // Select a license from a list.
    {
        type: "list",
        name: "license",
        message: "Please choose a license.",
        choices: ["copyleft","lpgl","MIT","permissive","proprietary","public"]
    },
    // Enter constribution guidelines.
    {
        type: "input",
        name: "contribution",
        message: "Please enter your project contribution guidelines."
    },
    // Enter test instructions.
    {
        type: "input",
        name: "testInstructions",
        message: "Please enter your project test instructions."
    },
    // Enter GitHub user name.
    {
        type: "input",
        name: "gitHubUserName",
        message: "Please enter your GitHub user name."
    },
    // Enter your email address.
    {
        type: "input",
        name: "email",
        message: "Please enter your email address."
    },
]

// FUNCTIONS ==================================

// writeUserInfo - takes user responses and writes a README.md file
const writeUserInfo = (userResponses) => {
  // Build a string with user responses.
  const content = formatReadMe(userResponses);

  // Write the generated content to a file. If there is an error writing to the file, console.log the error message received.
  // Else, console.log an success message.
  fs.writeFile("readme.md", content, (err) => err ? console.error(err) : console.log("File was successly generated!"));
}

// formatReadMe - takes the user responses to the prompts and creates a string with the user responses inserted as 
// template literals in the appropriate locations within the output string.
const formatReadMe = (userResponses) => {
    // Return the content string which contains the content of the ReadMe file.
    let content = `# ${userResponses.title}

## Description
${userResponses.description}

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions)

## Installation
${userResponses.installation};

## Usage
${userResponses.usage}

## License

## Contributing
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg)](code_of_conduct.md)

${userResponses.contribution}

## Tests
${userResponses.testInstructions}

## Questions
GitHub Profile: [@${userResponses.gitHubUserName}](http://github.com/${userResponses.gitHubUserName})

Email: <${userResponses.email}>
    `;

    return content;
}

// USER INTERACTIONS ==========================

// Prompt the user to get answers to questions.
inquirer
  .prompt(questions)
  // Write a ReadMe file using the amswers to the prompts.
  .then(response => {
    writeUserInfo(response);
    console.log(response);
  })
  // If there is an error console.log the error.
  .catch.error(err => {
    console.log(err);
  })

  