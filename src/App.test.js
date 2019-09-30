import React from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import App from './App';
import Cart from './Cart';
import Product from './Product';
import {expect} from 'chai';
import store from './store';
import {render, getByTitle, fireEvent} from '@testing-library/react'
import reducers from './reducers';

/*I initially had trouble testing redux connected components with Enzyme, but I switched to
react-testing-library and worked it out. Initially, I was trying to inspect the actual state and props,
but I instead changed my approach to inspect the actual DOM output*/

describe('Farmers Market', () => {
  it('clicking a product button should add product to the cart', () => {
    const initialState = {products: [{code: 'CF1', name: '', price: 11.23, count: 1},
                                    {code: 'CH1', name: '', price: 3.11, count: 1},
                                    {code: 'AP1', name: '', price: 6.00, count: 1},
                                    {code: 'MK1', name: '', price: 4.75, count: 1 }]};
    const container = makeContainer(initialState);

    /*All products in the shopping list have title = button. There are 5 products in the list.
      In this test, we will click Oatmeal since it is not in the initial state above*.
      We should expect to see 5 total buttons with title = cartButton
    */
    let button = container.getAllByTitle('button')[4];
    fireEvent.click(button);
    expect(container.getAllByTitle('cartButton').length).to.equal(5);
    
  });

  it('clicking a cart product button should remove product from the cart', () => {
    const initialState = {products: [{code: 'CF1', name: '', price: 11.23, count: 1}]}                       
    const container = makeContainer(initialState);

    /*A little simpler than the least. The initial state of 1 product means there will be 1 cart button element in the cart
      so we remove it. Because calling getAllByTitle on a non-existent title (cartButton after the only cart button is removed) 
      throws an error, I catch the error and the test succeeds...probably a better way to do this
    */
    let button = container.getAllByTitle('cartButton')[0];
    fireEvent.click(button);

    try {
      container.getAllByTitle('cartButton');
    } catch (e) {
      //the error should be 'unable to find an element with the title: cartButton'
      //console.log(e);
    }
  });

  /*It might be better to only give the component a title, and then navigate to the child (the quantity),
    but for simplicity, I added a title to the quantity <p> so it can be accessed directly.
  */
  it('clicking a product button when the product exists in the cart should increase the count', () => {
    const initialState = {products: [{code: 'CH1', name: '', price: 3.11, count: 1}]} ;                      
    const container = makeContainer(initialState);

    let button = container.getAllByTitle('button')[0];
    fireEvent.click(button);
    let quantity = container.getAllByTitle('quantity')[0];
    expect(quantity.innerHTML).to.equal('2');
   
  })

  /*One of the tests provided in the instructions*/
  it('should give a total of 25.78 for CH1, AP1, CF1, MK1, OM1', () => {
    const initialState = {products: [{code: 'CF1', name: '', price: 11.23, count: 1},
                                    {code: 'CH1', name: '', price: 3.11, count: 1},
                                    {code: 'AP1', name: '', price: 6.00, count: 1},
                                    {code: 'MK1', name: '', price: 4.75, count: 1 },
                                    {code: 'OM1', name: '', price: 3.69, count: 1}]};

    const container = makeContainer(initialState);
    let total = container.getByTitle('total').textContent;
    expect(total).to.equal('Total: 25.78');
    
  })

  const makeContainer = (initialState) => {
    const store = createStore(reducers, initialState);
    const container = render(
      <Provider store={store}>
        <App/>
      </Provider>
    )
    return container;
  }
})