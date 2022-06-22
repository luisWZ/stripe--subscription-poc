import React, { useState } from 'react';
import { useLoadPrices } from 'services/useLoadPrices';
import Loading from 'components/Loading';
import SubscriptionFormFreeTrial from 'components/SubscriptionFormFreeTrial';
import PlanSelection from 'components/PlanSelection';

const StripeElementsFreeTrial = () => {
  const { data, isLoading, error } = useLoadPrices();
  const [product, setProduct] = useState(null);

  if (error) return null;

  return isLoading ? (
    <Loading />
  ) : (
    <div className='plan'>
      <PlanSelection data={data} setProduct={setProduct} />
      {product ? (
        <SubscriptionFormFreeTrial product={product} setProduct={setProduct} />
      ) : null}
    </div>
  );
};

export default StripeElementsFreeTrial;
