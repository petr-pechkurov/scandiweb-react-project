import React from 'react';
import ProductCard from '../ProductCard/ProductCard';

export default class Category extends React.Component {
  render() {
    if (!this.props?.category) {
      return <h2>There are no products in this category, or wrong category name...</h2>
    }

    const { products, name } = this.props.category;

    return (
      <>
        <div className='category-name'>{name}</div>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </>)
  }
}
