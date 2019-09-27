import React, { Component } from 'react';
import './App.css';
import ProductList from './ProductList';
import Cart from './Cart';
import Product from './Product.js';

class App extends Component {
  render() {
    return (
      <section className="App">
        <p className='title'>Farmer's Market</p>
        <ProductList/>
        <Cart/>
      </section>
    );
  }
}


export default App;
