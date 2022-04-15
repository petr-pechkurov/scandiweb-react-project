import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import CategoryPage from './pages/CategoryPage';
import ProductDescriptionPage from './pages/ProductDescriptionPage';
import CurrencyContext from './contexts/CurrencyContext';

class App extends React.Component {
  setCurrency = (currency) => {
    this.setState({ currency: currency });
  };

  addProduct = (product) => {
    const cart = [...this.state.cart, product];
    this.setState({ cart: cart });
  };

  removeProduct = (product) => {
    const cart = this.state.cart.filter(
      (productInCart) => productInCart.id !== product.id
    );
    this.setState({ cart: cart });
  };

  state = {
    currency: '$',
    setCurrency: this.setCurrency,

    cart: [],
    addProduct: this.addProduct,
    removeProduct: this.removeProduct,
  };

  render() {
    return (
      <>
        <CurrencyContext.Provider value={this.state}>
          <Routes>
            <Route path='/' element={<CategoryPage />} />
            <Route path='/category/:name' element={<CategoryPage />} />
            <Route path='/product/:id' element={<ProductDescriptionPage />} />
          </Routes>
        </CurrencyContext.Provider>
      </>
    );
  }
}

export default App;
