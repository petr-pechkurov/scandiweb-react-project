import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CategoryPage from './pages/CategoryPage';
import ProductDescriptionPage from './pages/ProductDescriptionPage';
import CurrencyContext from './contexts/CurrencyContext';
import CartPage from './pages/CartPage';
import ErrorBoundary from './components/ErrorBoundary';

class App extends React.Component {
  setCurrency = (currency) => {
    this.setState({ currency: currency });
  };

  addProduct = (newProduct) => {
    const product = JSON.parse(JSON.stringify(newProduct));
    console.log(product);
    // const productsToCompare = this.state.cart.filter((product) => product.id === newProduct.id);
    const { attributes } = product;
    attributes.forEach((attribute) => {
      const selectedItems = attribute.items.find((item) => item.selected);
      if (!selectedItems) {
        attribute.items[0].selected = true;
      }
    });

    const existingProduct = this.findProductInCart(product);
    if (existingProduct) {
      this.changeQuantity(existingProduct.number, existingProduct.quantity + 1);
      return;
    }

    product.number = this.state.cart.length;
    product.quantity = 1;
    const cart = [...this.state.cart, product];
    this.setState({ cart });
    sessionStorage.setItem('cart', JSON.stringify(cart));
  };

  findProductInCart = (newProduct) => {
    const productsToCompare = this.state.cart.filter((product) => product.id === newProduct.id);
    const existingProduct = productsToCompare.find((product) => {
      const attributesToCheck = this.getSelectedAttributes(product);
      const newProdAttributes = this.getSelectedAttributes(newProduct);
      if (attributesToCheck.sort().toString() === newProdAttributes.sort().toString()) {
        return product;
      }
      return null;
    });
    return existingProduct;
  };

  getSelectedAttributes(product) {
    return product.attributes.map((attribute) => {
      return attribute.items.filter((item) => item.selected).map((item) => item.value);
    });
  }

  removeProduct = (index) => {
    const cart = this.state.cart.filter((productInCart) => productInCart.number !== index);
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
    return (
      <>
        <CurrencyContext.Provider value={this.state}>
          <ErrorBoundary>
            <Routes>
              <Route path='/' element={<CategoryPage />} />
              <Route path='/category/:name' element={<CategoryPage />} />
              <Route path='/product/:id' element={<ProductDescriptionPage />} />
              <Route path='/cart' element={<CartPage />} />
            </Routes>
          </ErrorBoundary>
        </CurrencyContext.Provider>
      </>
    );
  }
}

export default App;
