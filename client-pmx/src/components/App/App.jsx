import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from 'components/Layout';
import Loading from 'components/Loading';

import '../../styles/normalize.scss';
import '../../styles/styles.scss';

const HomePage = lazy(() => import('components/HomePage'));
const StripeElementsNoTrial = lazy(() =>
  import('components/StripeElementsNoTrial')
);
const StripeElementsFreeTrial = lazy(() =>
  import('components/StripeElementsFreeTrial')
);
const StripeCheckout = lazy(() => import('components/StripeCheckout'));
const CustomerDashboard = lazy(() => import('components/CustomerDashboard'));
const SubscriptionSuccess = lazy(() =>
  import('components/SubscriptionSuccess')
);

const App = () => {
  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route
              path='/elements-no-trial'
              element={<StripeElementsNoTrial />}
            />
            <Route
              path='/elements-free-trial'
              element={<StripeElementsFreeTrial />}
            />
            <Route path='/checkout' element={<StripeCheckout />} />
            <Route
              path='/customer/:customerId'
              element={<CustomerDashboard />}
            />
            <Route
              path='/subscription-success'
              element={<SubscriptionSuccess />}
            />
            <Route path='*' element={<HomePage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
