const logger = require("pino")({
  transport: { target: "pino-pretty" },
});
require("dotenv").config();

module.exports = {
  port: process.env.PORT,
  stripe: {
    secret_key: process.env.STRIPE_SECRET_KEY,
    publishable_key: process.env.STRIPE_PUBLISHABLE_KEY,
    webhook_secret: process.env.STRIPE_WEBHOOK_SECRET,
    checkout_currency: "mxn",
  },
  client: {
    domain: process.env.CLIENT_DOMAIN,
  },
  v_api: process.env.npm_package_version?.charAt(0),
  logger,
};
