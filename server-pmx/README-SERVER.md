# Paco Max Back End

## Stripe Implementation PoC

Instructions:

Logg in to stripe your stripe account thru the cli

```
stripe login
```

Obtain stripe keys

```
stripe config --list
```

Add the following variables to .env

```
PORT=4242
CLIENT_DOMAIN=http://localhost:3030
STRIPE_SECRET_KEY
STRIPE_PUBLISHABLE_KEY
STRIPE_WEBHOOK_SECRET
```

Obtain the webhook key

```
stripe listen --forward-to localhost:4242/webhook
```
