import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <div className='home'>
    <h1>Choose one of the following:</h1>
    <div className='flex'>
      <Link to='/elements'>Elements</Link>
      <Link to='/checkout'>Checkout</Link>
    </div>
  </div>
);

export default HomePage;
