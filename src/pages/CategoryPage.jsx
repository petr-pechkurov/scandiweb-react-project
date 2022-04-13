import React, { Component } from 'react';
import Category from '../components/Category/Category';
import Header from '../components/Header';
import { ClassicSpinner } from 'react-spinners-kit';
import { getCategoriesWithProducts } from '../repository';
import { withRouter } from '../withRouter';

class CategoryPage extends Component {
  categories;
  async componentDidMount() {
    ({ categories: this.categories } = await getCategoriesWithProducts());
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

  componentDidUpdate(prevProps) {
    if (this.props.params.name !== prevProps.params.name) {
      this.setSelectedCategory(this.props.params.name);
    }
  }

  render() {
    if (this.state?.categories) {
      const { categories } = this.state;
      return (
        <>
          <Header categories={categories} />
          <div className='products-container'>
            <Category
              products={
                categories.find((category) => category.selected === true)
                  ?.products
              }
            />
          </div>
        </>
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

const HOCProductPage = withRouter(CategoryPage);
export default HOCProductPage;
