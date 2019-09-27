import React, { Component } from 'react';
import products from './products.js'; //data
import Product from './Product.js';
import './App.css';

class ProductList extends Component {
  
  //an array of Product components for the shopping list  
  getProductElements() {
    const productElements = products.map((p,i) => {
      return <Product product={p} key={`productList${i}`} isInCart={false} />
    })

    return productElements;
  }

  render() {
    return (
        <section className="ProductList">
          <h1>Products</h1>
          {this.getProductElements()}
        </section>
    );
  }
}

export default ProductList;
