import React from 'react';
import ProductCard from '../ProductCard/ProductCard';

export default class Category extends React.Component {
  render() {
    if (!this.props.products) {
      return <div>no products</div>
    }
    return (<>
      <div className='category-name'>{this.props.name}</div>
      {this.props.products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </>)
  }
}
