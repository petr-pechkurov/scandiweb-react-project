import React, { Component } from 'react';
import shoppingCart from '../../assets/Empty Cart.svg';

export default class CartOverlay extends Component {
  render() {
    return (
      <div style={{"marginTop": "0.6rem"}}>
        <img src={shoppingCart} alt='shopcart' />
      </div>
    );
  }
}
