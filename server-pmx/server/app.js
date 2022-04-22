const express = require("express");
const cors = require("cors");

const errorHandler = require("./lib/errors/errorHandler");
const routes = require("./routes");

module.exports = (config) => {
  const app = express();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use(cors({ origin: config.client.domain }));

  app.use("/", routes(config));

  app.use(errorHandler);

  return app;
};
