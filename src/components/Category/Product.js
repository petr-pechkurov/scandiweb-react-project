import React, { Component } from 'react';
import { client, Field, Query } from '@tilework/opus';

client.setEndpoint('http://localhost:4000/');

export default class Product extends Component {
  state = {
    product: {
      id: '',
      name: '',
      gallery: [],
      prices: [],
    },
  };

  query = new Query('product')
    .addArgument('id', 'String!', this.props.id)
    .addField('id')
    .addField('name')
    .addField('gallery')
    .addField(
      new Field('prices', true)
        .addField(new Field('currency').addField('label').addField('symbol'))
        .addField('amount')
    );

  componentDidMount() {
    client.post(this.query).then((result) => {
      this.setState(result);
      console.log('didMount:', result);
    });
  }

  render() {
    const { id, name, gallery, prices } = this.state.product;
    const [imgSrc] = gallery;

    if (prices.length) {
      var [price] = prices;
      var { symbol } = price.currency;
      console.log('price:', price.currency);
    }

    return (
      <div className='product-box'>
        <div className='product-card'>
          <div className='img-container'>
            <img alt={name} src={imgSrc} />
          </div>
          <div className='name-and-price'>
            <div className='product-name'>{name}</div>
            <div className='product-price'>
              {symbol} {price?.amount}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
