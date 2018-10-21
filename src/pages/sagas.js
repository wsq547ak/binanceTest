import { fork } from 'redux-saga/effects';
import mainSaga from './main/saga'
import unitDetailSaga from './unitDetail/saga'

function *rootSaga() {
  yield [
    fork(mainSaga),
    fork(unitDetailSaga),
  ]
}

export default rootSaga;