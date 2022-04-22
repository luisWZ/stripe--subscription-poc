import React, { useState } from 'react';
import { useLoadPrices } from 'services/useLoadPrices';
import Loading from 'components/Loading';
import SubscriptionForm from 'components/SubscriptionForm';

const StripeElements = () => {
  const { data, isLoading, error } = useLoadPrices();
  const [subscriptionSelected, setSubscriptionSelected] = useState(null);

  if (error) return null;

  return isLoading ? (
    <Loading />
  ) : (
    <div>
      <h1>Choose a plan:</h1>
      {data?.length
        ? data.map((price) => (
            <div key={price.id}>
              <p>{price.product?.name}</p>
              <p>{price.nickname}</p>
              <p>
                ${price.unit_amount / 100} /{' '}
                {price.recurring?.interval === 'month' ? 'mes' : 'año'}
              </p>
              <button onClick={() => setSubscriptionSelected(price.id)}>
                Seleccionar
              </button>
            </div>
          ))
        : null}
      {subscriptionSelected ? (
        <SubscriptionForm subscriptionSelected={subscriptionSelected} />
      ) : null}
    </div>
  );
};

export default StripeElements;
