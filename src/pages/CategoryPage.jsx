import React, { Component } from 'react';
import Category from '../components/Category/Category';
import CategorySelecor from '../components/CategorySelector/CategorySelector';
import { getCategoriesWithProducts } from '../repository';
import { ClassicSpinner } from 'react-spinners-kit';
import CurrencySwitcher from '../components/CurrencySwitcher/CurrencySwitcher';
import CartOverlay from '../components/CartOverlay/CartOverlay';
import { useParams } from 'react-router-dom';

function withRouter(Component) {
  function ComponentWithRouter(props) {
    let params = useParams();
    return <Component {...props} params={params} />;
  }
  return ComponentWithRouter;
}

class CategoryPage extends Component {
  categories = [];

  state = {
    name: '',
  };

  static getDerivedStateFromProps(nextProps) {
    return {
      name: nextProps.params.name,
    };
  }

  async componentDidMount() {
    ({ categories: this.categories } = await getCategoriesWithProducts());

    this.categories = this.categories.map((category) => {
      return { ...category, selected: false };
    });

    const categoriesNames = this.categories.map((category) => category.name);
    console.log('names', categoriesNames);

    const categoryName = this.props.params.name ?? this.categories[0].name;

    if (!categoriesNames.includes(categoryName)) {
      this.setState({ invalidCategory: true });
      return;
    }

    const selectedCategory = this.categories.find(
      (category) => category.name === categoryName
    );
    selectedCategory.selected = true;
    this.setState(selectedCategory);
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
    if (this.state.products) {
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

    if (this.state.invalidCategory) {
      return <div>Invalid Category!</div>
    }

    return (
      <div className='center'>
        <ClassicSpinner color='black' />
        <div>Loading...</div>
      </div>
    );
  }
}

const HOCCategoryPage = withRouter(CategoryPage);
export default HOCCategoryPage;
