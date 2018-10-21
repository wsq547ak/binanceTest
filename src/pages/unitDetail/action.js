import { ADD_FUN, FETCH_PRODUCTS } from '../actionTypes'

export function addResult (numA, numB) {
  return {
    type: ADD_FUN,
    payload: {
      numA,
      numB
    }
  }
}

export function fetchPublicProducts() {
  // return dispatch => {
  //   return API.getProducts().then(res => {
  //     dispatch({
  //       type: FETCH_PRODUCTS_SUCCESS,
  //       payload: res
  //     })
  //   })
  // }
  return {
    type: FETCH_PRODUCTS,
    payload: {}
  }
}