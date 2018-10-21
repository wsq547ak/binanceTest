import { call, put, takeEvery } from 'redux-saga/effects';
import { getProducts } from '../../api/common'
import { ADD_SUCCESS, ADD_FUN, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS } from '../actionTypes'

function *addResult(action) {
  const response = yield call(getProducts);
  console.log("-------", response)
  yield put({
    type: ADD_SUCCESS,
    payload: response
  })
}

function *fetchPublicProducts(action) {
  const response = yield call(getProducts)
  yield put({
    type: FETCH_PRODUCTS_SUCCESS,
    payload: response
  })
}

function *mainSaga() {
  yield [
    takeEvery(ADD_FUN, addResult),
    takeEvery(FETCH_PRODUCTS, fetchPublicProducts)
  ]
}

export default mainSaga;