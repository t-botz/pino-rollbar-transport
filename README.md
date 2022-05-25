# @t-botz/pino-rollbar-transport

A [pino transport](https://getpino.io/#/docs/transports) to send logs to [Rollbar](https://rollbar.com)

## Installation

```
npm install --save @t-botz/pino-rollbar-transport
```

## Usage

```js
import pino from "pino";

const logger = pino({
  transport: {
    target: "@t-botz/pino-rollbar-transport",
    options: {
      rollbarOpts: {
        accessToken: "POST_CLIENT_ITEM_ACCESS_TOKEN",
        payload: {
          environment: "production",
        },
      },
      // Prevent calling console.error when rollbar returns errors
      logErrors: false
    },
  },
});
```

`rollbarOpts` is used to configure Rollbar, like [`new Rollbar(options)`](https://docs.rollbar.com/docs/nodejs)
