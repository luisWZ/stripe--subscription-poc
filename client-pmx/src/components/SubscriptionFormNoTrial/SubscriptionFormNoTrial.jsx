import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import faker from '@faker-js/faker/locale/es_MX';

import TestCards from 'components/TestCards';
import ButtonSubmit from 'components/ButtonSubmit';

const userId = faker.datatype.uuid();
const email = faker.internet.email();
const name = `${faker.name.firstName()} ${faker.name.lastName()}`;

const SubscriptionFormNoTrial = ({ product, setProduct }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isFormProcessing, setIsFormProcessing] = useState(false);
  const [existingCustomer, setExistingCustomer] = useState(null);
  const [subscription, setSubscription] = useState({
    status: false,
  });
  const [userData, setUserData] = useState({
    name,
    email,
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
      customerId,
      customerExist,
    } = await axios
      .post('/create-no-trial-subscription', {
        name,
        email,
        userId,
        priceId: product.priceId,
      })
      .then((r) => r.data);

    if (backendError) {
      setIsFormProcessing(false);
      setErrorMessage(backendError.message);
      return;
    }

    if (customerExist) {
      setIsFormProcessing(false);
      setExistingCustomer(customerExist);
      return;
    } else {
      setExistingCustomer(null);
    }

    const cardOptions = {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name,
          email,
        },
      },
    };

    const { error: stripeError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, cardOptions);

    setIsFormProcessing(false);

    if (stripeError) {
      setErrorMessage(stripeError.message);
      return;
    }

    if (paymentIntent.status === 'succeeded') {
      console.log('paymentIntent', paymentIntent);

      setSubscription({
        status: paymentIntent.status,
        customer: customerId,
      });
    }
  };

  return (
    <>
      {subscription.status === 'succeeded' ? (
        <Navigate to={`/customer/${subscription.customer}`} />
      ) : null}
      <div className='overlay' onClick={() => setProduct(null)}>
        <div className='sidebar' onClick={(evt) => evt.stopPropagation()}>
          <button
            className='close-btn'
            type='button'
            onClick={() => setProduct(null)}
          >
            &times;
          </button>
          <form onSubmit={submitHandler}>
            <h1>Checkout</h1>
            <h3>Subscription:</h3>
            <p className='bg-gray'>
              {product.name}:&ensp;${product.amount / 100} / {product.interval}
            </p>
            <h3>Payment info:</h3>
            <div>
              <input
                onChange={handleChange}
                type='text'
                id='name'
                name='name'
                placeholder='Name'
                autoComplete='name'
                value={userData.name}
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
                value={userData.email}
                required
              />
            </div>
            <div>
              <CardElement />
            </div>
            <ButtonSubmit
              disableListener={isFormProcessing}
              formIncomplete={!userData.email || !userData.name}
            >
              Subscribe me
            </ButtonSubmit>
          </form>
          {errorMessage ? (
            <div className='error-msg' id='card-errors' role='alert'>
              {errorMessage}
            </div>
          ) : null}
          {existingCustomer ? (
            <Link
              className='existing-customer'
              to={`/customer/${existingCustomer}`}
            >
              Manage subscription
            </Link>
          ) : null}
          <TestCards />
        </div>
      </div>
    </>
  );
};

export default SubscriptionFormNoTrial;
