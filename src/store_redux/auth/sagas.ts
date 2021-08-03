import { all, fork, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import axios from '@/common/axios';
import { AUTH } from '@/store_redux/auth/action';

const signInRequest = (payload: { id: string; pw: string }) => {
  console.log('mobx action signIn');

  const response = axios.post('user/signIn', { email: payload.id, password: payload.pw }).catch((e) => {
    console.log('로그인 에러.1 아이디 또는 비밀번호 확인');
  });
  return response;
};

export function* signIn(_id: string, _pw: string) {
  const posts = yield call(signInRequest, { id: _id, pw: _pw });
}

export function* tokenRefreshSaga() {
  // try {
  // const userInfo = yield call(signIn, {})
  // }
}

export function* authSaga() {
  yield fork();
}
