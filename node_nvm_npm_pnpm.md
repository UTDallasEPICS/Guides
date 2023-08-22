# Node
Node is a Javascript runtime that can run on servers. This lets us use one language across the whole stack, both frontend and backend. There are some differences between Node and the browser runtimes, but this gap has decreased as browser features get ported over. 

## NVM

NVM is the Node Version Manager. This tool helps manage different versions of Node, which really is only needed if you are working with really old projects that can't be upgraded or if you want to work with experimental versions, but it is way simpler than installing Node yourself. You can find installation instructions [here](https://github.com/nvm-sh/nvm). After installing, run `source ~/.bashrc`.

Once you have installed NVM, you can install the latest Long Term Support (LTS) version of node using `nvm install --lts`. 

## NPM

NPM is the Node Package Manager. It manages dependencies and provides some additional tooling for JS projects, both frontend and backend. 

## PNPM

PNPM is a better version of NPM. Most of the improvement comes from package management - while NPM will redownload a dependency every tie it encounters it, PNPM will save all dependencies in one spot and reuse them if it can, making installation way faster. To install PNPM, run `npm i -g pnpm`. You can configure an alias in your shell, `alias npm='pnpm'`, to run PNPM instead of NPM while still using the `npm` command - this means if a script uses NPM, it will stay compatible.

## Installation

These commands will be run in your WSL instance if you are on Windows. 
