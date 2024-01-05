# Node

Node is a Javascript runtime that can run on servers. This lets us use one language across the whole stack, both frontend and backend. There are some differences between Node and the browser runtimes, but this gap has decreased as browser features get ported over.

## NVM

NVM is the Node Version Manager. This tool helps manage different versions of Node, which really is only needed if you are working with really old projects that can't be upgraded or if you want to work with experimental versions, but it is way simpler than installing Node yourself. You can find installation instructions [here](https://github.com/nvm-sh/nvm). After installing, run `source ~/.bashrc`.

Once you have installed NVM, you can install the latest Long Term Support (LTS) version of node using `nvm install --lts`.

## NPM

NPM is the Node Package Manager. It manages dependencies and provides some additional tooling for JS projects, both frontend and backend.

## PNPM

PNPM is a better version of NPM. Most of the improvement comes from package management - while NPM will redownload a dependency every tie it encounters it, PNPM will save all dependencies in one spot and reuse them if it can, making installation way faster. To install PNPM, run `npm i -g pnpm`. You can configure an alias in your shell, `alias npm='pnpm'`, to run PNPM instead of NPM while still using the `npm` command - this means if a script uses NPM, it will stay compatible.

## package.json

A `package.json` file is a configuration file used in Node.js projects to define and manage project dependencies, scripts, and other metadata. It is typically located at the root of a project directory. It contains a JSON object with properties that describe different aspects of the project. This makes it easy to automate processing of the project metadata.

The `package.json` file also serves as a record of the project's dependencies and their specific versions. This is crucial for version control systems like Git, as it allows other developers to easily set up the project with the correct dependencies.

## Dependencies

The `dependencies` section lists the external libraries or packages that the project depends on. These dependencies are typically installed using a package manager like npm or yarn. The `package.json` file ensures that all necessary dependencies can be easily installed by running a single command.

## Scripts

The `scripts` section defines custom commands that can be executed via the command line. These scripts can be used to automate common tasks, such as running tests, starting a development server, building the project, or deploying it to a server. By defining scripts in the `package.json` file, developers can easily run these commands without remembering complex command sequences.

## Project Initialization

When starting a new project, creating a `package.json` file is often the first step. This file can be generated automatically using the `npm init` or `yarn init` command, which guides you through a series of prompts to set up the project metadata.

In summary, the `package.json` file is a central component of Node.js projects. It provides important project metadata, manages dependencies, defines scripts for automation, and facilitates collaboration among developers. It is a crucial file for setting up, maintaining, and sharing Node.js projects.

## Example package.json

```json
{
  "name": "my-node-project",
  "version": "1.0.0",
  "description": "A sample Node.js project",
  "author": "Your Name",
  "license": "MIT",
  "dependencies": {
    "express": "^4.17.1",
    "lodash": "^4.17.21"
  },
  "devDependencies": {
    "nodemon": "^2.0.7",
    "eslint": "^7.32.0",
    "jest": "^27.2.5"
  },
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "lint": "eslint .",
    "test": "jest"
  }
}
```

In this example:

- The project is named `my-node-project` and has a version of `1.0.0`.
- The description and author fields provide additional information about the project.
- The license field specifies that the project is licensed under the MIT license.
- The dependencies section lists two dependencies: `express` and `lodash`. The version numbers indicate the minimum acceptable version range.
- The devDependencies section lists three development dependencies: `nodemon`, `eslint`, and `jest`. These are dependencies required for development purposes, such as running tests or linting code.
- The scripts section defines several commands:
  - The `start` script runs the project using the `node` command.
  - The `dev` script runs the project using `nodemon`, which automatically restarts the server when changes are made to the code during development.
  - The `lint` script runs the ESLint linter to check the code for potential errors or coding style violations.
  - The `test` script runs the Jest testing framework to execute tests written for the project.
