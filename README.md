# AirQuality

AirQuality is a service that provides information about air pollution of the nearest city using latitude and longitude. It includes a cron job that runs every minute to store Paris's pollution data.

## Table of Contents

- [Installation](#installation)
- [Running the Server](#running-the-server)
- [Running the Cron Job](#running-the-cron-job)
- [Running the Tests](#running-the-tests)
- [API Documentation](#api-documentation)
- [License](#license)

## Installation

Before you start, make sure you have Node.js, Yarn, and Docker installed on your machine.

1. Clone the repository:

```bash
git clone https://github.com/Abdullah-A-Elsayed/airquality.git
```

2. Navigate to the project directory:

```bash
cd airquality
```

3. Install the dependencies:

```bash
yarn install
```

4. Copy the .env.example file and rename it to .env. Update the .env file with your environment variables.
5. Start the Docker container for the database:

```bash
docker-compose up -d
```

6. Generate Prisma client:

```bash
yarn prisma:generate
```

7. Run database migrations:

```bash
yarn prisma:migrate
```

## Running the Server

To start the server in development mode, run:

```bash
yarn dev
```

To start the server in production mode, first build the project:

```bash
yarn build
```

Then start the server:

```
yarn start
```

## Running the Cron Job

To start the cron job in development mode, run:

```bash
yarn dev:job
```

To start the cron job in production mode, run:

```bash
yarn start:job
```

## Running the Tests

To run the tests, use the following command:

```bash
yarn test
```

## API Documentation

You can view the API documentation in two ways:

1. Navigate to `localhost:3000/docs` on your local server to view the API documentation.
2. Visit the [online API documentation](https://htmlpreview.github.io/?https://github.com/Abdullah-A-Elsayed/airquality/blob/main/docs/output/index.html).

## License

This project is licensed under the terms of the [MIT](https://mit-license.org/) license.

Made with ❤️ by Abdullah Ali
