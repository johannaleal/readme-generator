// DEPENDENCIES ===============================
// built in node packages
const fs = require('fs');

// npm packages
const inquirer = require('inquirer');

// DATA =======================================

// FUNCTIONS ==================================
const writeUserInfo = (userResponses) => {
  // build a string with user responses
  const text = formatReadMe(userResponses);

  // write it to a file
  fs.writeFile("readme.md", text, (err) => err ? console.error(err) : console.log("success"));
}

function formatReadMe(userResponses) {
    return `# ${userResponses.title}

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
${userResponses.contribution}

## Tests
${userResponses.testInstructions}

## Questions
${userResponses.gitHubUserName}
${userResponses.email}

    `;
}
// USER INTERACTIONS ==========================
// Ask the user for different repo info.
inquirer
  .prompt([
    // Ask the user their project title.
    {
      type: "input",
      name: "title",
      message: "What is your project title?"
    },
    {
        type: "input",
        name: "description",
        message: "Please enter your project description."
    },
    {
        type: "input",
        name: "installation",
        message: "Please enter your project installation instructions."
    },
    {
        type: "input",
        name: "usage",
        message: "Please enter your project usage information."
    },
    {
        type: "input",
        name: "contribution",
        message: "Please enter your project contribution guidelines."
    },
    {
        type: "input",
        name: "testInstructions",
        message: "Please enter your project test instructions."
    },
    {
        type: "input",
        name: "gitHubUserName",
        message: "Please enter your GitHub user name."
    },
    {
        type: "input",
        name: "email",
        message: "Please enter your GitHub email."
    },
  ])
  .then(response => {
    writeUserInfo(response);
    console.log(response);
  })

  