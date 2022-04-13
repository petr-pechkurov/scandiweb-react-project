import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import CategoryPage from './pages/CategoryPage';
import ProductDescriptionPage from './pages/ProductDescriptionPage';

class App extends React.Component {
  render() {
    return (
      <>
        <Routes>
          <Route path='/' element={<CategoryPage />} />
          <Route path='/category/:name' element={<CategoryPage />} />
          <Route path='/product/:id' element={<ProductDescriptionPage />} />
        </Routes>
      </>
    );
  }
}

export default App;
