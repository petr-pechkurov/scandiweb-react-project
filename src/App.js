import React from 'react';
import Category from './components/Category/Category';
import CategorySelecor from './components/CategorySelector/CategorySelector';
import { getCategoriesWithProducts } from './repository';
import { ClassicSpinner } from 'react-spinners-kit';

class App extends React.Component {
  categories = [];
  constructor() {
    super();
    getCategoriesWithProducts().then((result) => {
      this.categories = result.categories;
      const [firstCategory] = this.categories;
      this.setState(firstCategory);
    });
  }

  render() {
    if (this.state) {
      return (
        <div>
          <CategorySelecor
            onSelect={(name) => {
              console.log(name);
              this.setState(this.categories.find((c) => c.name === name));
            }}
          />
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

export default App;
