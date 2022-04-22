import React from 'react';
/** @jsxImportSource @emotion/react */
import { Global } from '@emotion/react';
import CssModernReset from './CssModernReset';
import CssScaffolding from './CssScaffolding';

const GlobalStyles = () => {
  return (
    <>
      <Global styles={CssModernReset} />
      <Global styles={CssScaffolding} />
    </>
  );
};

export default GlobalStyles;
