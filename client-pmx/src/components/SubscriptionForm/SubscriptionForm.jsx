import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const SubscriptionForm = ({ subscriptionSelected }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isFormProcessing, setIsFormProcessing] = useState(false);
  // const [existingCustomer, setExistingCustomer] = useState(null);
  const [subscriptionComplete, setSubscriptionComplete] = useState({
    status: false,
    invoiceUrl: '',
  });
  const [userData, setUserData] = useState({
    name: '',
    email: '',
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setUserData({ ...userData, [name]: value });
  };

  const submitHandler = async (evt) => {
    evt.preventDefault();

    const name = userData.name;
    const email = userData.email;

    setErrorMessage('');

    if (!stripe || !elements) {
      return;
    }

    if (!email) {
      setErrorMessage('Please provide an email');
      return;
    }

    setIsFormProcessing(true);

    const {
      error: backendError,
      clientSecret,
      invoiceUrl,
    } = await axios
      .post('/create-subscription', {
        name,
        email,
        priceId: subscriptionSelected,
      })
      .then((r) => r.data);

    if (backendError) {
      setIsFormProcessing(false);
      setErrorMessage(backendError.message);
      return;
    }

    console.log('clientSecret', clientSecret);

    // if (customer) {
    //   setIsFormProcessing(false);
    //   setExistingCustomer(customer);
    //   return;
    // } else {
    //   setExistingCustomer(null);
    // }

    const { error: stripeError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name,
            email,
          },
        },
      });

    setIsFormProcessing(false);

    if (stripeError) {
      console.log('error', stripeError);
      setErrorMessage(stripeError.message);
      return;
    }

    if (paymentIntent.status === 'succeeded') {
      setSubscriptionComplete({ status: true, invoiceUrl });

      await axios.post('/customer-default-payment', {
        paymentMethod: paymentIntent.payment_method,
        customer: paymentIntent.customer,
      });
    }
  };

  return !subscriptionComplete.active ? (
    <div>
      <form onSubmit={submitHandler}>
        <h1>Info:</h1>
        <div>
          <input
            onChange={handleChange}
            type='text'
            id='name'
            name='name'
            placeholder='Nombre'
            autoComplete='name'
            required
          />
        </div>
        <div>
          <input
            onChange={handleChange}
            type='email'
            id='email'
            name='email'
            placeholder='Email'
            autoComplete='email'
            required
          />
        </div>
        <div>
          <CardElement />
        </div>
        <button disabled={isFormProcessing}>Subscribirme</button>
      </form>
      {errorMessage ? (
        <div className='sr-field-error' id='card-errors' role='alert'>
          {errorMessage}
        </div>
      ) : null}
    </div>
  ) : (
    <div></div>
  );
};

export default SubscriptionForm;
