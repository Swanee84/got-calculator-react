import { fork } from 'redux-saga/effects';
import authSaga from './auth/sagas';
import codeSaga from './code/sagas';

export default function* rootSaga() {
  yield fork(authSaga);
  yield fork(codeSaga);
}
