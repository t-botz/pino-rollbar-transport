const Rollbar = require("rollbar");
const abstractTransport = require("pino-abstract-transport");

const defaultOpts = {
  rollbarOpts: {},
  // `logErrors: true` log the error (e.g Invalid token, ...) with console.error.
  logErrors: true,
  // Providing a rollbar factory is useful for tests but is incompatible with worker threads
  _rollbarFactory: (rollbarOpts) => new Rollbar(rollbarOpts),
};

function pinoLevelToRollbar(level) {
  if (!Number.isInteger(level)) {
    return new Error("level is not a number - " + level);
  }
  if (level < 30) return "debug";
  else if (level < 40) return "info";
  else if (level < 50) return "warning";
  else if (level < 60) return "error";
  else return "critical";
}

function build(options = {}) {
  const opts = Object.assign({}, defaultOpts, options);
  const rollbar = opts._rollbarFactory(opts.rollbarOpts);

  const stream = abstractTransport(
    async function (source) {
      for await (let obj of source) {
        const { msg, time, level, ...props } = obj;
        const rollbarLevel = pinoLevelToRollbar(level)
        if(opts.logErrors && rollbarLevel instanceof Error){
          console.error(error)
          continue
        }
        rollbar.log(
          msg || "",
          {
            level: rollbarLevel,
            ...props,
          },
          (error) => {
            if (opts.logErrors && error)
              console.error(error)
          }
        )
      }
    },
    {
      close: (err, cb) => {
        rollbar.wait(cb);
        delete rollbar;
      },
    }
  );
  return stream
}

module.exports.default = build;
module.exports = build;
