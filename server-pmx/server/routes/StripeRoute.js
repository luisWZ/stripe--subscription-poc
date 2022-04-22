const express = require("express");
const router = express.Router();

module.exports = (config) => {
  const stripe = require("stripe")(config.stripe.secret_key);
  const logger = config.logger;

  router.get("/", (req, res) => res.json({ API: `v${config.v_api}` }));

  router.get("/load-stripe", (req, res, next) => {
    try {
      res.send({
        publishableKey: config.stripe.publishable_key,
      });
    } catch (error) {
      next(error);
    }
  });

  router.post(
    "/webhook",
    express.raw({ type: "application/json" }),
    (req, res) => {
      const sig = req.headers["stripe-signature"];

      let event;

      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          sig,
          process.env.STRIPE_WEBHOOK_SECRET
        );
      } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }

      // Handle the event
      switch (event.type) {
        case "payment_intent.succeeded":
          logger.info(event.type);
          break;
        case "payment_intent.payment_failed":
          logger.info(event.type);
          break;
        default:
          console.log(`Unhandled event type ${event.type}`);
      }

      // Return a 200 respond to acknowledge receipt of the event
      res.send();
    }
  );

  router.get("/load-prices", async (req, res, next) => {
    try {
      const prices = await stripe.prices.list({
        lookup_keys: ["pacomax_monthly", "pacomax_anual"],
        expand: ["data.product"],
      });

      res.send({
        prices: prices.data,
      });
    } catch (error) {
      next(error);
    }
  });

  router.get("/create-checkout-session", async (req, res, next) => {
    const domainURL = config.client.domain;
    const { priceId, userId } = req.body;

    if (!priceId || !userId) throw new Error("Missing values");

    try {
      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        payment_intent_data: {
          metadata: {
            userId,
          },
        },
        success_url: `${domainURL}/subscription-success/{CHECKOUT_SESSION_ID}`,
        cancel_url: `${domainURL}/`,
      });

      res.redirect(303, session.url);
    } catch (error) {
      next(error);
    }
  });

  return router;
};
