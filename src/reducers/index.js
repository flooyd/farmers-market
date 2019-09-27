const initialState = {
  products: []
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      //product will be null if the user is adding the item for the first time
      let product = state.products.find(p => p.code === action.product.code);
      if(!product) {
      //add product and set initial count
        action.product.count = 1;
        return Object.assign({}, state, {
          products: [...state.products, action.product]
        })
      } else {
        //find product and update count
          let products = state.products.map(p => {
            if(p.code === product.code)
            {
              p.count = p.count + 1;
            }

            return p;
          })
          return Object.assign({}, state, {
            products
          })
        }

    case 'REMOVE_PRODUCT':
      //ambiguous, but used to track whether to remove the product entirely, rather than updating count
      let removeProduct = false;
      let products = state.products.map(p => {
        if(p.code === action.product.code)
        {
          //count is updated and the product is removed if the quantity goes from 1 -> 0
          p.count = p.count - 1
          if(p.count === 0)
          {
            removeProduct = true;
          }
        }

        return p;
      })
      //removed from state when quantity goes from 1->0
      if(removeProduct) {
        return Object.assign({}, state, {
          products: state.products.filter(p => p.code !== action.product.code)
        })
      }
      return Object.assign({}, state, {
        products
      })
          
    default:
      return state;
  }
}



export default reducers;