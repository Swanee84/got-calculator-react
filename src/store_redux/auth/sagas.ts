import { takeEvery, put, call } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import axios from '@/common/axios';
import { AUTH, AuthRequest, signInFail, signInSuccess, tokenRefreshFail } from '@/store_redux/auth/action';

const signInRequest = (payload: { id: string; pw: string }) => {
  console.log('mobx action signIn');

  const response = axios.post('user/signIn', { email: payload.id, password: payload.pw }).catch((e) => {
    console.log('로그인 에러.1 아이디 또는 비밀번호 확인');
  });
  return response;
};

const tokenRefreshRequest = () => {
  const response = axios.get('user/tokenRefresh');
  return response;
};

export function* signIn(action: AuthRequest) {
  // const posts = yield call(signInRequest, { id: _id, pw: _pw });
  if (action.type !== AUTH.SIGN_IN) {
    return;
  }
  try {
    const { data } = yield call(signInRequest, action.payload);
    yield put(signInSuccess(data));
  } catch (e) {
    console.log(e);
    yield put(signInFail({}));
  }
}

export function* tokenRefreshSaga(action: AuthRequest) {
  if (action.type !== AUTH.TOKEN_REFRESH) {
    return;
  }
  try {
    const { data } = yield call(tokenRefreshRequest);
  } catch (e) {
    console.log(e);
    yield put(tokenRefreshFail());
  }
}

export function* authSaga() {}
