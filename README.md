# Random Average

Provides a single HTTP GET endpoint that returns the average (specifically, the [arithmetic mean](https://en.wikipedia.org/wiki/Arithmetic_mean)) of an array of random numbers, fetched approximately every second from the [Cryptographically Secure Random Number Generator (CSRNG) API](https://csrng.net/).

## Getting Started / Prerequisites

First, if you're already using TCP port 3000, copy `.env.example` as `.env` and change `PORT`. The rest of this guide assumes the default of `3000` is OK. If you also want noisier logs, you can set `LOG_LEVEL` to `debug`.

It is assumed you have Node.js 18+ already installed and ready to go. This app uses [pnpm](https://pnpm.io/), so if you don't already have that installed, you can do so easily by executing `corepack enable`.

Install the dependencies by running `pnpm install`. This also installs a couple of Husky hooks (one runs `pnpm install` if the `pnpm-lock.yaml` file has changed on merge and the other ensures everything committed has been run through Prettier and eslint).

## Running For Development

Execute `pnpm watch`. This runs the HTTP and scheduler services and auto-reloads when it detects a change in any of the source files. To view the arithmetic mean of all the numbers retrieved so far by the scheduler from the CSRNG API, simply make a HTTP GET request to [http://localhost:3000](http://localhost:3000).

## Building For Production

Execute `pnpm build`. This generates a minified single file bundle in the `dist` folder. This uses external packages, so it'll still need the `node_modules` folder wherever it is run.

## Running Tests

Execute `pnpm test`. This also generates a coverage report in the console and in the `coverage/lcov-report` folder.

## Final Thoughts

Although this is a reasonable stab at the task, it could certainly be more robust. For one thing, there are no integration tests, so the actual Express API and task scheduler are not being tested (including the exit after ten consecutive erroneous calls to the CSRNG API functionality). However, are we testing business logic, or testing Express and/or Toad Scheduler? There's an argument that the tests in place are good enough. I haven't added eslint either, which I would usually put in place and have it check/fix staged files in the same way Prettier is run.
