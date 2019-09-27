import React from 'react';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {mount} from 'enzyme'
import App from './App';
import Cart from './Cart';
import {expect} from 'chai';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

const mockStore = configureStore([]);

/*My testing experience is pretty limited, and I ran into some issues connecting enzyme with redux,
so there are only two integration tests to check that the total is accurate with a variety of products

I am confident that I would learn quickly from an established testing environment, 
and maybe it's easier with MobX :)*/
describe('Farmers Market', () => {
  const mockStore = configureStore();
  it('should give a total of 25.09 for CF1, CH1, AP1, MK1', () => {
    const initialState = {products: [{code: "CF1", name: '', price: 11.23, count: 1},
                                    {code: 'CH1', name: '', price: 3.11, count: 1},
                                    {code: 'AP1', name: '', price: 6.00, count: 1},
                                    {code: 'MK1', name: '', price: 4.75, count: 1 }]}
    const store = mockStore(initialState);
    const wrapper = mount(
    <Provider store={store}>
      <App/>
    </Provider>
    )
    expect(wrapper.find(Cart).find('h2').text()).to.equal('Total: 25.09')
  })

  it('should give a total of 25.78 for CH1, AP1, CF1, MK1, OM1', () => {
    const initialState = {products: [{code: "CF1", name: '', price: 11.23, count: 1},
                                    {code: 'CH1', name: '', price: 3.11, count: 1},
                                    {code: 'AP1', name: '', price: 6.00, count: 1},
                                    {code: 'MK1', name: '', price: 4.75, count: 1 },
                                    {code: 'OM1', name: '', price: 3.69, count: 1}]}
    const store = mockStore(initialState);
    const wrapper = mount(
    <Provider store={store}>
      <App/>
    </Provider>
    )
    expect(wrapper.find(Cart).find('h2').text()).to.equal('Total: 25.78')
  })
})