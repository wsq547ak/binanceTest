import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import './index.css';

import { composeWithDevTools } from 'redux-devtools-extension'

import Routers from './router'

import mainReducer from './pages/main/reducer'
import unitReducer from './pages/unitDetail/reducer'

import rootSaga from './pages/sagas'

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = composeWithDevTools({})

const reducers = {
  mainReducer,
  unitReducer,
}

const store = createStore(
  combineReducers({...reducers}),
  composeEnhancers(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(rootSaga)

ReactDOM.render(
  <Provider store={store}>
    <Routers />
  </Provider>, 
  document.getElementById('root')
);

