const { logger } = require("../../config");

const errorStatus = { status: "error" };

module.exports = (error, req, res) => {
  const { message, stack } = error;

  const stripeError = error.type?.match(/Stripe/g);
  if (stripeError) {
    res.status(400).send({ ...errorStatus, message, stack });
  }
  // Unhandled errors ---------------------------------------------------------
  logger.fatal(error);
  return res.status(500).send({ ...errorStatus, message, stack });
};
