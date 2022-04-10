import React from 'react';
import { Navigate } from 'react-router-dom';
import './ProductCard.css';

export default class ProductCard extends React.Component {
  render() {
    const { id, name, gallery, prices } = this.props.product;
    const [imgSrc] = gallery;
    const [price] = prices;
    const { symbol } = price.currency;

    return (
      <div className='product-box' onClick={() => this.setState({redirect: true})}>
        {this.state?.redirect && <Navigate to={`/product/${id}`} replace={true} />}
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
