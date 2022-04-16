import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import CategoryPage from './pages/CategoryPage';
import ProductDescriptionPage from './pages/ProductDescriptionPage';
import CurrencyContext from './contexts/CurrencyContext';
import CartPage from './pages/CartPage';

class App extends React.Component {
  setCurrency = (currency) => {
    this.setState({ currency: currency });
  };

  addProduct = (product) => {
    const cart = [...this.state.cart, product];
    this.setState({ cart: cart });
  };

  removeProduct = (index) => {
    const cart = this.state.cart.filter(
      (productInCart) => productInCart.number !== index
    );
    this.setState({ cart: cart });
  };

  changeQuantity = (index, quantity) => {
    console.log(index, quantity);
    const cart = this.state.cart.map((item) => {
      if (item.number === index) {
        return { ...item, quantity: quantity }
      }
      return item;
    })
    this.setState({ cart: cart });
  }

  state = {
    currency: '$',
    setCurrency: this.setCurrency,

    cart: [],
    addProduct: this.addProduct,
    removeProduct: this.removeProduct,
    changeQuantity: this.changeQuantity
  };

  render() {
    return (
      <>
        <CurrencyContext.Provider value={this.state}>
          <Routes>
            <Route path='/' element={<CategoryPage />} />
            <Route path='/category/:name' element={<CategoryPage />} />
            <Route path='/product/:id' element={<ProductDescriptionPage />} />
            <Route path='/cart' element={<CartPage />} />
          </Routes>
        </CurrencyContext.Provider>
      </>
    );
  }
}

export default App;
