import React from 'react';
import { useParams } from 'react-router-dom';

const CustomerDashboard = () => {
  const { customerId } = useParams();

  return (
    <div>
      <h1>Customer {customerId}</h1>
      <form action='/customer-portal' method='POST'>
        <input type='hidden' name='customer' value={customerId} />
        <button>Manage Billing</button>
      </form>
    </div>
  );
};

export default CustomerDashboard;
