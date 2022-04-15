import React from 'react';
import ProductCard from '../ProductCard/ProductCard';

export default class Category extends React.Component {
  render() {
    const { products, name } = this.props.category;
    if (!products) {
      return <div>no products</div>
    }

    return (
      <>
        <div className='category-name'>{name}</div>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </>)
  }
}
