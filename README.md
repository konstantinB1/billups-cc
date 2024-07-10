# Billups Code Challenge

## Overview

Project utilizes multiple packages (monorepo kinda) related to the project code challenge. Some packages include docker files since they are running individual processes that are tucked in in their respecive docker containers. Docker compose is used to orchestrate the containers and the network between them. Packages include

-   api - Koa.js server that serves the API
-   client - React.js client that serves the front end via Vite dev server
-   common - Common logic for migrations, client and api
-   migrations - Knex.js migrations for the database
-   models - database models for the API

## Running the project

To run the project, you will need to have Docker and Docker Compose installed on your machine. Once you have those installed, you can run the following command to start the project:

```bash

docker-compose up --build

```

It will expose 2 servers:

-   API server: http://localhost:8000
-   Client server: http://localhost:3000

## Potential issues

The biggest issue that can arose is race conditions between dependencies in docker compose file. Somethimes the api server will start before migrations are done, and migrations might start before the postgress port socket is listening. I addressed some of those issues with `wait-for`, and last 10 times i ran the project it worked fine. But if this happens, just run the command few more times, and it should work fine.

## Third party packages used

-   Koa.js for the API server, was thinking to use vanilla node http module but decided to use Koa.js for the sake of time, and ease of use.
-   Postgress for the database, i used the official docker image for the database.
-   Knex.js for the database migrations, so a table for the matches would be auto created when the docker compose is run.
-   React 18 for the client UI
-   Plain css for styling, no frameworks involved. I wanted to keep it simple and clean, and also latest css features is something i really like and wanted to try it out in contrast to modern css in js frameworks. Inspired by Tailwind
-   Vite for the client dev server, it's fast and easy to use.
-   Docker and Docker Compose for running the project in a containerized environment.
-   Jest for some basic tests, i didn't have enough time to be really thorough with the tests.
-   Eslint and Prettier for code linting and formatting.
-   `tsx` binary for typescript support on the node server.
-   `@tanstack/react-query` for data fetching and caching on the client side. Was thinking of a vanilla solution - using just fetch api, but react query exposes some nice built in features.
-   `framer-motion` for animations on the client side.

## Dev

Docker is hooked up to work with vite and api server, so we don't need to restart. Hot reload is enabled with command:

```bash
docker compose up --build --watch
```

or just

```bash

docker compose watch
```

## Things left to do

-   Add more tests, especially for the client side.
-   Enable github workflows for CI testing, and linting
-   Refactor the client side code, it's a bit messy.
-   Robust docker compose with guarantees that the migrations are done before the api server starts.
-   Better monorepo support with either something like Turbo or nx
-   Some polish on the UI, and animations
