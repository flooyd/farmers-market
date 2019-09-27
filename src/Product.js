
import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import {addProduct, removeProduct} from './actions'

class Product extends Component {
    handleClickButton() {
        /*redux handles updating the state, either removing the product (reducing its count), 
        removing it entirely (count = 0), or adding the product (increasing its count)*/
        if(this.props.isInCart) {
            return this.props.dispatch(removeProduct(this.props.product));
        }
        this.props.dispatch(addProduct(this.props.product));
    }

    render() {
        //It might be a good idea to make a CartProduct component to avoid the conditionals...idk
        return (
            <div className="Product">
              <p>{this.props.product.name}</p>
              <p>{this.props.totalPrice || this.props.product.price}</p>
              <button onClick={() => {this.handleClickButton()}}>{this.props.isInCart ? 'Remove from cart': 'Add to cart'}</button>
              <p className='quantity'>{this.props.quantity}</p>
              {this.props.isInCart ? <p className='coupons'>{this.props.numCoupons} coupons applied</p>: null}
            </div>
          );
    }
}

const mapStateToProps = state => {
    return {
        products: state.products
    }
}
export default connect(mapStateToProps)(Product);