import React from 'react';

const TestCards = () => {
  return (
    <div className='testcards'>
      <div>
        Try a{' '}
        <a
          className='inline'
          href='https://stripe.com/docs/testing#cards'
          target='_blank'
          rel='noopener noreferrer'
        >
          test card
        </a>{' '}
        :
      </div>
      <div>
        <code>4242424242424242</code> (Visa)
      </div>
      <div>
        <code>5555555555554444</code> (Mastercard)
      </div>
      <div>
        <code>4000002500003155</code> (Requires{' '}
        <a
          className='inline'
          href='https://www.youtube.com/watch?v=2kc-FjU2-mY'
          target='_blank'
          rel='noopener noreferrer'
        >
          3DSecure
        </a>
        )
      </div>
      <div>
        <code>4000000000000002</code> (Generic Decline)
      </div>
      <div>
        <code>4000000000009995</code> (Insufficient funds decline)
      </div>
      <div>
        <code>4000000000009979</code> (Stolen card decline)
      </div>
      <div>
        <code>4000000000000341</code> (Decline after attaching)
      </div>
    </div>
  );
};

export default TestCards;
