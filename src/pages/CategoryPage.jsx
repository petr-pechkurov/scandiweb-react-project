import React, { Component } from 'react';
import Category from '../components/Category';
import Header from '../components/Header';
import { ClassicSpinner } from 'react-spinners-kit';
import { getCategoryByName } from '../repository';
import { withRouter } from '../withRouter';

class CategoryPage extends Component {
  async componentDidMount() {
    const selectedCategory = this.props.params.name ?? 'all';
    const category = await getCategoryByName(selectedCategory);
    this.setState(category);
  }

  async componentDidUpdate(prevProps) {
    if (this.props.params.name !== prevProps.params.name) {
      const category = await getCategoryByName(this.props.params.name);
      this.setState(category);
    }
  }

  render() {
    if (this.state) {
      return (
        <>
          <Header />
          <div className='products-container'>
            <Category category={this.state.category} />
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
