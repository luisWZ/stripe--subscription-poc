import Loading from 'components/Loading';
import React from 'react';

const ButtonSubmit = ({ children, disableListener, formIncomplete }) => {
  return (
    <button id='submit' disabled={disableListener || formIncomplete}>
      {disableListener ? (
        <Loading buttonStyles={true} />
      ) : (
        <span id='button-text'>{children}</span>
      )}
    </button>
  );
};

export default ButtonSubmit;
