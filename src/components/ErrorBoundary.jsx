import React, { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='error-container'>
          <h1>Something went wrong.</h1>
          <a href='/'>Back to Shop</a>
        </div>
      );
    }
    return this.props.children;
  }
}
