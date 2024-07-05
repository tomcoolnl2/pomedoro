# Pomedoro

- Angular frontend
- NestJS backend

## Node

Run `nvm use` to make sure to use the proper NodeJS version. 
If you don't have the version described in the `.nvmrc`, run `nvm install` in the project root directory first.

## Start the application locally

## Frontend

Run `npx nx serve pomodoro` to start the frontend development server on `http://localhost:4200/`.
Run `npx nx run ui:storybook` to start a Storybook development server and explore all available components on `http://localhost:4400/`

## Backend

Run `npx nx serve schedule` to start the api as development server on `http://localhost:3000/api`.
Visit `http://localhost:3000/docs` to see the Swagger Documentation.

## Build for production

Run `npx nx build pomodoro` to build the application. The build artifacts are stored in the output directory `dist/`, ready to be deployed.


## Test

Run `npm test` to run all tests for the monorepo. 
This is the command used by CI/CD in the Github Actions.

Run `npm run test:watch` to run tests in watch mode.

## Project graph

Run `npx nx graph` to show the graph of the workspace.
It will show tasks that you can run with Nx.

-   [Project Graph](https://nx.dev/core-features/explore-graph)
