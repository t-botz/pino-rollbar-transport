const test = require("tap").test;
const pino = require("pino");

test("v7 transport test", (t) => {
  const transport = pino.transport({
    target: "..",
    options: {
      rollbarOpts: {
        enabled: false,
      },
    },
  });
  const logger = pino(transport);
  logger.info("hello");
  transport.flushSync();
  transport.end();

  // If we haven't crashed by then it means :
  // - The transport successfully launched in a worker
  // - logging doesn't make it crash despite no token and being disabled
  t.end();
});

