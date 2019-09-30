import React, { Component } from 'react';
import { connect } from 'react-redux';
import Product from './Product.js';

class Cart extends Component {
  //this takes in the number of coupons applied, the total price of each item and makes a Product component. The index is used for the key.
  makeProductElement(p, i, total, numCoupons = 0) {
    return <Product product={p} quantity={p.count} numCoupons={numCoupons} totalPrice={total.toFixed(2)} key={`Cart${i}`} isInCart={true} />
  }

  /*This seems like a pretty complicated function and is something I would like to work on more possibly*/
  processCouponsAndElements(total) {
    //oatmeal will be null if count is 0, which will cause the apple coupon to not be applied
    let oatmeal = this.props.products.find(p => p.code === 'OM1');
    let productElements = []
    this.props.products.forEach((p, i) => {
      let productElement;
      let numCoupons;
      //BOGO coupon
      if (p.code === 'CF1' && p.count >= 2) {
        let count = p.count;
        if (count % 2 !== 0) {
          //for odd numbers of coffee...
          count = count - 1;
        }
        numCoupons = count / 2;
        productElement = this.makeProductElement(p, i, (p.price * p.count) - ((count / 2) * p.price), numCoupons);
        productElements.push(productElement);
        return total -= (count / 2) * p.price;
      }
      //APOM coupon
      if (p.code === 'AP1' && oatmeal) {
        if (p.count >= oatmeal.count) {
          numCoupons = oatmeal.count;
          productElement = this.makeProductElement(p, i, (p.price * p.count) - (oatmeal.count * (p.price / 2)), numCoupons);
          total -= oatmeal.count * (p.price / 2);
        } else {
          numCoupons = p.count;
          productElement = this.makeProductElement(p, i, (p.price * p.count) - (p.count * (p.price / 2)), numCoupons);

          total -= p.count * (p.price / 2);
        }
        return productElements.push(productElement);
      }

      productElements.push(this.makeProductElement(p, i, (p.count * p.price)));
    });

    //I return an object here to use it in two places in render (product elements and the total)
    return { productElements, total: total.toFixed(2) };
  }

  processTotal() {
    if (this.props.products.length > 0) {
      let total = 0;

      this.props.products.forEach(p => {
        //each product has a price and quanity (count), so the initial total is easy
        total += p.price * p.count;
      });

      let elemCoupons = this.processCouponsAndElements(total);
      return this.processCouponsAndElements(total);
    }

    //no products in cart
    return {
      total: 0
    };

  }

  render() {
    const { productElements, total } = this.processTotal();
    return (
      <section className='Cart' title='cart'>
        <h1>Cart</h1>
        <p>{this.props.products.length > 0 ? null : 'No items in your cart.'}</p>
        {productElements}
        <h2 className='total' title='total'>Total: {total}</h2>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  }
}

export default connect(mapStateToProps)(Cart);
