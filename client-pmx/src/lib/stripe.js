import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

export const fetchStripePromise = async () => {
  const { data } = await axios('/load-stripe');
  return loadStripe(data.publishableKey);
};

export const stripePromise = fetchStripePromise();
