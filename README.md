# NestJS Starter Kit

This is a starter kit for NestJS projects. It includes the following:

- [ ] (WIP) Authentication with JWT from custom provider (see [auth-nodejs-express](https://github.com/starter-kits-usmb/auth-nodejs-express))
- [ ] (WIP) TypeOrm for Postgres
- [x] Docker compose for local development
- [ ] (WIP) Docker compose for production

## Installation

```bash
$ npm install
```

## Running the app

```bash
# start the database
$ docker-compose up -d

# start the app in development mode
$ npm run start:dev
```

## Deploying the app

Uncomment the `nestjs-app` service in docker-compose.yml and run the following command:

```bash
# run docker build
$ docker-compose up -d --build
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
