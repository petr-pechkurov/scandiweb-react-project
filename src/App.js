import React from 'react';
import Product from './components/Category/Product';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>App works!</h1>
        <div className='products-container'>
          <Product id='jacket-canada-goosee' />
          <Product id='ps-5' />
          <Product id='xbox-series-s' />
        </div>
      </div>
    );
  }
}

export default App;
