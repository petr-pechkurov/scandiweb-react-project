import React, { Component } from 'react';
import './CategorySelector.css';
import { getCategories } from '../../repository';

export default class CategorySelecor extends Component {
  categories;

  async componentDidMount() {
    ({ categories: this.categories } = await getCategories());
    this.categories = this.categories.map((cat) => {
      return { ...cat, selected: false };
    });
    const [firstCategory] = this.categories;
    firstCategory.selected = true;
    this.setState({ categories: this.categories });
  }

  selectCategory = (event) => {
    const selectedCategoryName = event.target.name;

    this.categories.forEach((category) => {
      category.selected = category.name === selectedCategoryName ? true : false;
    });

    this.setState({ categories: this.categories });
    this.props.onSelect(selectedCategoryName);
  };

  render() {
    return (
      <div className='buttons-container'>
        {this.state?.categories?.map((category) => (
          <button
            onClick={this.selectCategory}
            key={category.name}
            name={category.name}
            className={`button ${category.selected ? 'selected' : ''}`}>
            {category.name}
          </button>
        ))}
      </div>
    );
  }
}
