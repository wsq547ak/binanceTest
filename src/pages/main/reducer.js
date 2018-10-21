import { ADD_SUCCESS, FETCH_PRODUCTS_SUCCESS } from '../actionTypes'

let initState = {
  time: 0,
  products: [],
}

export default function mainReducer(state = initState, action){
  switch(action.type) {
    case ADD_SUCCESS: {
      return {
        time: state.time + 1
      }
    }
    case FETCH_PRODUCTS_SUCCESS: {
      return {
        ...state,
        products: action.payload.data
      }
    }
    default: {
      return state;
    }
  }
};