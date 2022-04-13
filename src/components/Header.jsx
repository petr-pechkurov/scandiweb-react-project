import React, { Component } from 'react';
import CategorySelecor from '../components/CategorySelector/CategorySelector';
import CurrencySwitcher from '../components/CurrencySwitcher/CurrencySwitcher';
import CartOverlay from '../components/CartOverlay/CartOverlay';

export default class Header extends Component {
  render() {
    return (
      <div>
        <div className='header'>
          <div className='box'>
            <CategorySelecor
              categories={this.props.categories.map((category) => {
                return { name: category.name, selected: category.selected };
              })}
            />
          </div>
          <div className='box'>
            <CurrencySwitcher onSwitch={this.setProductPrices} />
            <div className='cart'>
              <CartOverlay />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// setProductPrices = (currency) => {
//   const selectedCategory = this.categories.find(
//     (category) => (category.name = this.state.name)
//   );
//   const products = selectedCategory.products.map((product) => {
//     return {
//       ...product,
//       prices: product.prices.filter(
//         (price) => price.currency.symbol === currency
//       ),
//     };
//   });

//   this.setState({ products });
// };
