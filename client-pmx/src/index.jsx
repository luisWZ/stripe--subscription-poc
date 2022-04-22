import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from 'lib/stripe';
import App from 'components/App';

ReactDOM.render(
  <StrictMode>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </StrictMode>,
  document.getElementById('root')
);
