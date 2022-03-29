import React from 'react';
import ProductCard from '../ProductCard/ProductCard';

export default class Category extends React.Component {
  render() {
    return (<>
      <div className='category-name'>{this.props.name}</div>
      {this.props.products.products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </>)
  }
}
