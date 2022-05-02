import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';

const SubscriptionSuccess = () => {
  const [searchParams] = useSearchParams();
  const [sessionId] = useState(searchParams.get('session_id'));
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    async function updateCustomer() {
      const { statusText, data } = await axios.post(
        '/checkout-subscription-success',
        {
          sessionId,
        },
        { signal: controller.signal }
      );
      if (statusText === 'OK' && data.customer) {
        setCustomer(data.customer);
      }
    }
    updateCustomer();

    return () => controller.abort();
  }, [sessionId]);

  return (
    <div>
      <h1>Subscription Success</h1>
      {customer ? (
        <Navigate to={`/customer/${customer}`} replace={true} />
      ) : null}
    </div>
  );
};

export default SubscriptionSuccess;
