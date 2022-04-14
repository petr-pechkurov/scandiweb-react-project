import React, { Component } from 'react';
import shoppingCart from '../../assets/Empty Cart.svg';
import CurrencyContext from '../../contexts/CurrencyContext';

export default class CartOverlay extends Component {
  static contextType = CurrencyContext;
  render() {
    const productsCount = this.context.cart.length;
    return (
      <div className='cart-overlay' style={{ "marginTop": "0.6rem" }}>
        <div className='product-counter'>{productsCount > 0 ? productsCount : '' }</div>
        <img src={shoppingCart} alt='shopcart' />
      </div>
    );
  }
}
