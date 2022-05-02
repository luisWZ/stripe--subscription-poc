class StripeEvents {
  constructor(stripe) {
    this.stripe = stripe;
  }

  // Using Elements
  // setup_intent.succeeded
  // trial period
  // checkout customer is null
  // no trial no setupintent
  async setupIntentSucceeded({ customer, payment_method }) {
    if (customer) {
      await this.stripe.customers.update(customer, {
        invoice_settings: {
          default_payment_method: payment_method,
        },
      });
    }
  }
  // Using Elements
  // invoice.payment_succeeded
  // No trial period, charges inmediatly
  // when trial, payment_intent will be null
  async invoicePaymentSucceeded({
    subscription,
    billing_reason,
    payment_intent: payment_intent_id,
  }) {
    if (billing_reason === "subscription_create" && payment_intent_id) {
      const payment_intent = await this.stripe.paymentIntents.retrieve(
        payment_intent_id
      );

      await this.stripe.subscriptions.update(subscription, {
        default_payment_method: payment_intent.payment_method,
      });
    }
  }

  // Checkout Method
  // customer.subscription.created
  // default_payment_method null for elements
  async customerSubscriptionCreated({ customer, default_payment_method }) {
    if (default_payment_method) {
      await this.stripe.customers.update(customer, {
        invoice_settings: {
          default_payment_method,
        },
      });
    }
  }
}

module.exports = (stripe) => new StripeEvents(stripe);
