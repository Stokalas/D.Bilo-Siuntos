# DBilo Siuntos Front End

## Prerequisites

- [Node.js](https://nodejs.org/en/) (latest 16.x recommended)
- Yarn (install using npm (`npm i -g yarn`) or download [standalone installer](https://yarnpkg.com/lang/en/docs/install/))
- [VS Code](https://code.visualstudio.com/) or any other text editor that supports Typescript, ESLint, Sass Lint and Prettier plugins. Required plugins for VS Code:
  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  - [Sass Lint](https://marketplace.visualstudio.com/items?itemName=glen-84.sass-lint)
  - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
  - [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)

**NOTE:** If you use other text editor, make sure that ESLint checks `.ts` and `.tsx` files.

## Setup

Install npm packages by calling `yarn install` from this directory.

## Pre-commit and pre-push hooks

On `git commit` and `git push` pre-commit and pre-push will be run. If you want to skip these scripts, use `--no-verify` flag

### Launching project

- Use `yarn start` to launch the project against local backend. The command will launch Webpack Dev Server to listen for Typescript and style changes.

### Running tests

Use `yarn test` to run all unit tests. Jest is used as a test runner, so you can use all available [Jest CLI options](https://jestjs.io/docs/en/cli.html)
(e.g. you can collect code coverage by setting `--coverage` flag).
Watch mode is turned on by default, pass `--no-watch` flag to turn in off.

## Scripts

- Use `yarn start` to launch the project against local backend. The command will launch Webpack Dev Server to listen for Typescript and style changes.
- Use `yarn lint` to automatically detect code and css style issues.
- Use `yarn lint:fix` to automatically detect and fix code and css style issues (not all can be fixed automatically).
- Use `yarn typescript` to automatically detect typescript.
- Use `yarn test` to run tests.
