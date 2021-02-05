// DEPENDENCIES ===============================

// Built in node and npd packages
const fs = require('fs');
const { registerPrompt } = require('inquirer');
const inquirer = require('inquirer');

// DATA =======================================

// Array of prompts
const confirmResponse = (input) => {
    if (input === "") {
        return "This field is required!"
    }
    return true;
}

const questions = [
    // What is your project title?
    {
        type: "input",
        name: "title",
        message: "Enter your project title:",
        validate: confirmResponse
    },
    // What is your project description?
    {
        type: "input",
        name: "description",
        message: "Enter your project description:",
        validate: confirmResponse
    },
    // Enter installation instructions.
    {
        type: "input",
        name: "installation",
        message: "Enter your project installation instructions:"
    },
    // Enter usage information.
    {
        type: "input",
        name: "usage",
        message: "Enter your project usage information:"
    },
    // Select a license from a list.
    {
        type: "list",
        name: "license",
        message: "Choose a license:",
        choices: ["Apache License 2.0","GNU General Public License v3.0","MIT License","BSD-2-Clause Simplified License","Mozilla Public License 2.0"]
    },
    // Enter constribution guidelines.
    {
        type: "input",
        name: "contribution",
        message: "Enter your project contribution guidelines:"
    },
    // Enter test instructions.
    {
        type: "editor",
        name: "testInstructions",
        message: "Enter your project test instructions:"
    },
    // Enter GitHub user name.
    {
        type: "input",
        name: "gitHubUserName",
        message: "Enter your GitHub user name:"
    },
    // Enter your email address.
    {
        type: "input",
        name: "email",
        message: "Enter your email address:"
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
    // Find the selected badge link.
    let link = "";

    switch (userResponses.license)  {
        case "Apache License 2.0":
            link = "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
            break;
        case "GNU General Public License v3.0":
            link = "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
            break;
        case "MIT License":
            link = "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
            break;
        case "BSD-2-Clause Simplified License":
            link = "[![License](https://img.shields.io/badge/License-BSD%202--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)";
            break;
        case "Mozilla Public License 2.0":
            link = "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)";
            break;
     };

     console.log(`The badge link is ${link}`);

    // Return the content string which contains the content of the ReadMe file.
    let content = `# ${userResponses.title}

${link}

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
This application is covered under license: ${userResponses.license}

## Contributing
${userResponses.contribution}

## Tests
${userResponses.testInstructions}

## Questions
### Contact Information:

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
  .then(userResponse => {
    writeUserInfo(userResponse);
  })
  // If there is an error, write an error to the console.
  .catch(err => {
    console.error(err);
  })

  