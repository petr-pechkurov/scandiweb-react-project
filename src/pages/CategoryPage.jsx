import React, { Component } from 'react';
import Category from '../components/Category/Category';
import CategorySelecor from '../components/CategorySelector/CategorySelector';
import { getCategoriesWithProducts } from '../repository';
import { ClassicSpinner } from 'react-spinners-kit';
import CurrencySwitcher from '../components/CurrencySwitcher/CurrencySwitcher';
import CartOverlay from '../components/CartOverlay/CartOverlay';

export default class CategoryPage extends Component {
  categories = [];

  async componentDidMount() {
    ({ categories: this.categories } = await getCategoriesWithProducts());

    this.categories = this.categories.map((category) => {
      return { ...category, selected: false };
    });

    const [firstCategory] = this.categories;
    firstCategory.selected = true;
    this.setState(firstCategory);
  }

  setProductPrices = (currency) => {
    const selectedCategory = this.categories.find(
      (category) => (category.name = this.state.name)
    );
    const products = selectedCategory.products.map((product) => {
      return {
        ...product,
        prices: product.prices.filter(
          (price) => price.currency.symbol === currency
        ),
      };
    });

    this.setState({ products });
  };

  render() {
    if (this.state) {
      console.log('this.state:', this.state);
      return (
        <div>
          <div className='header'>
            <div className='box'>
              <CategorySelecor
                onSelect={(name) => {
                  this.setState(this.categories.find((c) => c.name === name));
                }}
              />
            </div>
            <div className='box'>
              <CurrencySwitcher onSwitch={this.setProductPrices} />
              <div className='cart'>
                <CartOverlay />
              </div>
            </div>
          </div>
          <div className='products-container'>
            <Category name={this.state.name} products={this.state} />
          </div>
        </div>
      );
    }

    return (
      <div className='center'>
        <ClassicSpinner color='black' />
        <div>Loading...</div>
      </div>
    );
  }
}
