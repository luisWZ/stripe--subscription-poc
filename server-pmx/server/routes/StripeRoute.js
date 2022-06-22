const router = require("express").Router();

module.exports = (config) => {
  const stripe = require("stripe")(config.stripe.secret_key);
  const StripeEvents = require("../services/StripeEvents")(stripe);
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

  router.post("/webhook", (req, res, next) => {
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.rawBody,
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
      case "checkout.session.completed":
        logger.info(event.type);
        break;
      case "invoice.paid":
        logger.info(event.type);
        break;
      case "invoice.payment_failed":
        logger.info(event.type);
        break;
      case "setup_intent.succeeded":
        logger.info(event.type);
        StripeEvents.setupIntentSucceeded(event.data?.object);
        break;
      case "invoice.payment_succeeded":
        logger.info(event.type);
        try {
          StripeEvents.invoicePaymentSucceeded(event.data?.object);
        } catch (error) {
          next(error);
        }
        break;
      case "customer.subscription.created":
        logger.info(event.type);
        try {
          StripeEvents.customerSubscriptionCreated(event.data?.object);
        } catch (error) {
          next(error);
        }
        break;
      default:
        // logger.info(event.data?.object);
        logger.info(`Unhandled event type ${event.type}`);
    }

    // Return a 200 respond to acknowledge receipt of the event
    res.send();
  });

  router.get("/load-prices", async (req, res, next) => {
    try {
      const prices = await stripe.prices.list({
        lookup_keys: ["pacomax_monthly", "pacomax_annual"],
        expand: ["data.product"],
      });

      res.send({
        prices: prices.data,
      });
    } catch (error) {
      next(error);
    }
  });

  router.post("/create-checkout-session", async (req, res, next) => {
    const { price, email, userId } = req.body;

    try {
      if (!price || !userId) throw new Error("Missing values");

      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        line_items: [
          {
            price,
            quantity: 1,
          },
        ],
        customer_email: email,
        subscription_data: {
          metadata: { userId, email },
          trial_end: Math.round(Date.now() / 1000) + config.one_week * 2,
        },
        success_url: `${config.clientDomain}/subscription-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${config.clientDomain}/checkout`,
      });

      res.redirect(303, session.url);
    } catch (error) {
      next(error);
    }
  });

  router.post("/checkout-subscription-success", async (req, res, next) => {
    const { sessionId } = req.body;
    try {
      const { customer } = await stripe.checkout.sessions.retrieve(sessionId);

      res.send({ customer });
    } catch (error) {
      next(error);
    }
  });

  router.post("/customer-portal", async (req, res, next) => {
    const { customer } = req.body;
    try {
      const portalSession = await stripe.billingPortal.sessions.create({
        customer,
        return_url: `${config.clientDomain}/customer/${customer}`,
      });

      res.redirect(303, portalSession.url);
    } catch (error) {
      next(error);
    }
  });

  router.post("/create-no-trial-subscription", async (req, res, next) => {
    const { name, email, userId, priceId } = req.body;
    try {
      const customerExists = await stripe.customers.search({
        query: `email:"${email}"`,
      });

      if (customerExists.data?.length) {
        const [customer] = customerExists.data;

        const { data } = await stripe.paymentIntents.search({
          query: `customer:"${customer.id}"`,
        });

        const [paymentIntent] = data.length ? data : [null];

        if (paymentIntent.status === "requires_payment_method") {
          // customer has a pending process
          // for example a card declined
          return res.send({
            clientSecret: paymentIntent.client_secret,
            customerId: customer.id,
          });
        }

        // customer already has a subscription
        return res.send({
          customerExist: customer.id,
        });
      }

      const customer = await stripe.customers.create({
        email,
        name,
        metadata: {
          userId,
        },
      });

      const subscription = await stripe.subscriptions.create({
        payment_behavior: "default_incomplete",
        expand: ["latest_invoice.payment_intent"],
        customer: customer.id,
        items: [
          {
            price: priceId,
          },
        ],
        metadata: {
          userId,
          email,
        },
      });

      // console.log("subscription =>", subscription);

      const clientSecret =
        subscription.latest_invoice.payment_intent.client_secret;

      res.send({
        clientSecret,
        customerId: customer.id,
      });
    } catch (error) {
      next(error);
    }
  });

  router.post("/create-free-trial-subscription", async (req, res, next) => {
    const { userId, email, customerId, paymentMethod, priceId } = req.body;
    try {
      const subscription = await stripe.subscriptions.create({
        trial_period_days: 14,
        customer: customerId,
        default_payment_method: paymentMethod,
        items: [
          {
            price: priceId,
          },
        ],
        metadata: {
          userId,
          email,
        },
      });

      // console.log("subscription =>", subscription);

      res.send({ subscription });
    } catch (error) {
      next(error);
    }
  });

  router.post("/setup-intent", async (req, res, next) => {
    const { name, email, userId } = req.body;
    try {
      const customerExists = await stripe.customers.search({
        query: `email:"${email}"`,
      });

      if (customerExists.data?.length) {
        const [customer] = customerExists.data;

        const { data } = await stripe.setupIntents.list({
          customer: customer.id,
        });

        const [setupIntent] = data.length ? data : [null];

        if (setupIntent.status === "requires_payment_method") {
          // customer has a pending process
          // for example a card declined
          return res.send({
            clientSecret: setupIntent.client_secret,
            customerId: customer.id,
          });
        }

        // customer already has a subscription
        return res.send({
          customerExist: customer.id,
        });
      }

      const customer = await stripe.customers.create({
        email,
        name,
        metadata: {
          userId,
        },
      });

      const setupIntent = await stripe.setupIntents.create({
        customer: customer.id,
        payment_method_types: config.stripe.payment_method_types,
        metadata: {
          userId,
        },
      });

      return res.send({
        clientSecret: setupIntent.client_secret,
        customerId: customer.id,
      });
    } catch (error) {
      next(error);
    }
  });

  return router;
};
