import React, { Component } from 'react';
import './CategorySelector.css';
import { getCategories } from '../../repository';

export default class CategorySelecor extends Component {
  constructor() {
    super();
    getCategories().then((result) => this.setState(result));
  }

  selectCategory = (event) => {
    this.props.onSelect(event.target.name);
  };

  render() {
    return (
      <div className='buttons-container'>
        {this.state?.categories?.map((category) => (
          <button
            onClick={this.selectCategory}
            key={category.name}
            name={category.name}
            className='button'>
            {category.name}
          </button>
        ))}
      </div>
    );
  }
}
