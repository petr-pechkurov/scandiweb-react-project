import React from 'react';
import { Navigate } from 'react-router-dom';
import CurrencyContext from '../../contexts/CurrencyContext';
import './ProductCard.css';
import shoppingCart from '../../assets/Empty Cart.svg';
export default class ProductCard extends React.Component {
  static contextType = CurrencyContext;
  state = {
    isButtonVisible: false,
  };

  showButton = () => {
    this.setState({ isButtonVisible: true });
  };
  hideButton = () => {
    this.setState({ isButtonVisible: false });
  };

  render() {
    const { id, name, gallery, prices, inStock } = this.props.product;
    const [imgSrc] = gallery;
    const price = prices.find(
      (price) => price.currency.symbol === this.context.currency
    );
    const { symbol } = price.currency;

    return (
      <div
        className={`product-box ${inStock ? '' : 'not-in-stock'}`}
        onMouseEnter={this.showButton}
        onMouseLeave={this.hideButton}>
        {this.state?.redirect && (
          <Navigate to={`/product/${id}`} replace={true} />
        )}
        {!inStock && (<div className='out-of-stock'>out of stock</div>)}
        <div className='product-card'>
          <div
            className='img-container'
            onClick={() => this.setState({ redirect: true })}>
            <img alt={name} src={imgSrc} />
          </div>
          {this.state.isButtonVisible && inStock && (
            <div
              className='btn-container'
              onClick={() => this.context.addProduct(this.props.product)}>
              <div className='add-product-btn'>
                <img src={shoppingCart} alt='cart' />
              </div>
            </div>
          )}
          <div className='name-and-price'>
            <div className='product-name'>{name}</div>
            <div className='product-price'>
              {symbol} {price.amount}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
