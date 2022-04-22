import React, { Component } from 'react';

import { ErrorOverlayStyles, ErrorTextStyles } from './ErrorBoundary.styles';

class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.log('info', info);
    console.log('error', error);
  }

  render() {
    const { error } = this.state;

    if (error) {
      return (
        <ErrorOverlayStyles>
          <ErrorTextStyles>Something went wrong</ErrorTextStyles>
          <code>{error}</code>
        </ErrorOverlayStyles>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
