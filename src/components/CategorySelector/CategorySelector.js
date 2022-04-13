import React, { Component } from 'react';
import './CategorySelector.css';
import { withRouter } from '../../withRouter';
import { Link, Navigate } from 'react-router-dom';

class CategorySelecor extends Component {
  categories;
  componentDidMount() {
    this.categories = this.props.categories;

    this.setState({ categories: this.categories });
  }

  selectCategory = (event) => {
    const selectedCategoryName = event.target.name;

    this.categories.forEach((category) => {
      category.selected = category.name === selectedCategoryName ? true : false;
    });

    this.setState({ categories: this.categories });
    this.props.navigate(`/category/${selectedCategoryName}`);
  };

  render() {
    return (
      <div className='buttons-container'>
        {this.state?.categories.map((category) => (
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

export default withRouter(CategorySelecor);
