import React from 'react';
import './ProductCard.css';

export default class ProductCard extends React.Component {
  render() {
    const { id, name, gallery, prices } = this.props.product;
    const [imgSrc] = gallery;
    var [price] = prices;
    var { symbol } = price.currency;

    return (
      <div className='product-box'>
        <div className='product-card'>
          <div className='img-container'>
            <img alt={name} src={imgSrc} />
          </div>
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
