const express = require("express");
const cors = require("cors");

const errorHandler = require("./lib/errors/errorHandler");
const routes = require("./routes");

module.exports = (config) => {
  const app = express();

  app.use(express.urlencoded({ extended: false }));
  app.use(
    express.json({
      verify: function (req, res, buf) {
        if (req.originalUrl.startsWith("/webhook")) {
          req.rawBody = buf.toString();
        }
      },
    })
  );

  app.use(cors({ origin: config.clientDomain }));

  app.use("/", routes(config));

  app.use(errorHandler);

  return app;
};
