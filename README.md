# NestJS Starter Kit

This is a starter kit for NestJS projects. It includes the following:

- [x] Authentication with JWT
- [x] TypeOrm for PostgresSql
- [x] Docker compose for local development
- [x] Swagger documentation available at `/api`
- [ ] Docker compose for production (db + automatically build the app and run it in a container)

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
