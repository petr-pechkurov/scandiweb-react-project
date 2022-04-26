import React, { Component } from 'react';
import CategorySelecor from '../components/CategorySelector';
import CurrencySwitcher from '../components/CurrencySwitcher';
import CartOverlay from './CartOverlay';
import { getCategories } from '../repository';
import { withRouter } from '../withRouter';
import logo from '../assets/a-logo.svg'

class Header extends Component {
  categories;
  async componentDidMount() {
    ({ categories: this.categories } = await getCategories());
    const selectedCategory = this.props.params.name;
    this.setSelectedCategory(selectedCategory);
  }

  setSelectedCategory(categoryName) {
    this.categories = this.categories.map((category) => {
      return {
        ...category,
        selected: category.name === categoryName ? true : false,
      };
    });
    this.setState({ categories: this.categories });
  }

  render() {
    if (!this.state) return null;
    return (
      <div>
        <div className='header'>
          <div className='box'>
            <CategorySelecor
              categories={this.categories.map((category) => {
                return { name: category.name, selected: category.selected };
              })}
            />
          </div>
          <div>
            <img src={logo} alt='logo' />
          </div>
          <div className='box'>
            <CurrencySwitcher />
            <div className='cart'>
              <CartOverlay />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const HOCHeader = withRouter(Header);
export default HOCHeader;
