# paco-max-stripe-poc
PoC Stripe Implementation

There are two separated codebase, a back-end using node.js express `server` and front-end `client` using react.

Open two separate terminal windows, and cd into their folder, `npm install` and `npm start`

`server-pmx` contains a sample of the environments needed to run the backend:

```
PORT=4242
CLIENT_DOMAIN=http://localhost:3030
STRIPE_SECRET_KEY=rk_test_51...
STRIPE_PUBLISHABLE_KEY=pk_test_51...
STRIPE_WEBHOOK_SECRET=whsec_65...
```

Just make sure `CLIENT_DOMAIN` has the same port as the `start` script from the client's `package.json` file.

Also make sure `proxy` property on the client's `package.json` file, is the same the `PORT` on the `.env` file.
