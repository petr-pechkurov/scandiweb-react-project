import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CategoryPage from './pages/CategoryPage';
import ProductDescriptionPage from './pages/ProductDescriptionPage';
import CurrencyContext from './contexts/CurrencyContext';
import CartPage from './pages/CartPage';

class App extends React.Component {
  setCurrency = (currency) => {
    this.setState({ currency: currency });
  };

  addProduct = (newProduct) => {
    const product = JSON.parse(JSON.stringify(newProduct));
    const { attributes } = product;
    attributes.forEach((attribute) => {
      const selectedItems = attribute.items.find((item) => item.selected);
      if (!selectedItems) {
        attribute.items[0].selected = true;
      }
    });
    product.number = this.state.cart.length;
    product.quantity = 1;
    const cart = [...this.state.cart, product];
    this.setState({ cart });
    sessionStorage.setItem('cart', JSON.stringify(cart));
  };

  removeProduct = (index) => {
    const cart = this.state.cart.filter(
      (productInCart) => productInCart.number !== index
    );
    this.setState({ cart: cart });
    sessionStorage.setItem('cart', JSON.stringify(cart));
  };

  changeQuantity = (index, quantity) => {
    const cart = this.state.cart.map((item) => {
      if (item.number === index) {
        return { ...item, quantity: quantity };
      }
      return item;
    });
    this.setState({ cart });
    sessionStorage.setItem('cart', JSON.stringify(cart));
  };

  state = {
    currency: sessionStorage.getItem('currency') || '$',
    setCurrency: this.setCurrency,

    cart: JSON.parse(sessionStorage.getItem('cart')) || [],
    addProduct: this.addProduct,
    removeProduct: this.removeProduct,
    changeQuantity: this.changeQuantity,
  };

  render() {
    console.log(JSON.parse(sessionStorage.getItem('cart')));
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
