const { logger } = require("../../config");

const errorStatus = { status: "error" };

// eslint-disable-next-line no-unused-vars
module.exports = (error, req, res, next) => {
  const { message, stack } = error;

  if (error.type) {
    logger.fatal(stack);
    res.status(400).send({ ...errorStatus, message });
  }
  // Unhandled errors ---------------------------------------------------------
  logger.fatal(stack);
  return res.status(500).send({ ...errorStatus, message });
};
