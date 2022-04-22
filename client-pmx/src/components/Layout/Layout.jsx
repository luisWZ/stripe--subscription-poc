import React from 'react';
import GlobalStyles from 'components/GlobalStyles';
import Header from 'components/Header';

const Layout = ({ children }) => {
  return (
    <>
      <GlobalStyles />
      <Header />
      <main>{children}</main>
    </>
  );
};

export default Layout;
