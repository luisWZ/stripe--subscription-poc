import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from 'components/Layout';
import Loading from 'components/Loading';

const HomePage = lazy(() => import('components/HomePage'));
const StripeElements = lazy(() => import('components/StripeElements'));
const StripeCheckout = lazy(() => import('components/StripeCheckout'));

const App = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/elements' element={<StripeElements />} />
            <Route path='/checkout' element={<StripeCheckout />} />
            <Route path='*' element={<HomePage />} />
          </Routes>
        </BrowserRouter>
      </Layout>
    </Suspense>
  );
};

export default App;
