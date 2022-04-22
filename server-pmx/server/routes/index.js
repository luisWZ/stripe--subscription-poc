const router = require("express").Router();

module.exports = (config) => {
  router.use("/", require("./StripeRoute")(config));

  router.use("*", (req, res) => {
    res.status(404).json({ status: "404", message: "No route config" });
  });

  return router;
};
