import { call, put, takeEvery } from 'redux-saga/effects';
import axios from '@/common/axios';
import { AUTH, AuthRequest, signInFail, signInSuccess } from './action';

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

export function* signInSaga(action: AuthRequest) {
  if (action.type !== AUTH.SIGN_IN) {
    return;
  }
  try {
    const { data } = yield call(signInRequest, action.payload);
    console.log('signIn response data >> ', data);
    if (data.status === 200) {
      yield put(signInSuccess(data.data));
    } else {
      yield put(signInFail(data.data));
    }
  } catch (e) {
    console.log(e);
    yield put(signInFail(e));
  }
}

export function* tokenRefreshSaga(action: AuthRequest) {
  if (action.type !== AUTH.TOKEN_REFRESH) {
    return;
  }
  try {
    const { data } = yield call(tokenRefreshRequest);
    console.log('signIn response data >> ', data);
    if (data.status === 200) {
      yield put(signInSuccess(data.data));
    } else {
      yield put(signInFail(data.data));
    }
  } catch (e) {
    console.log(e);
    yield put(signInFail(e));
  }
}

export default function* authSaga() {
  yield takeEvery(AUTH.SIGN_IN, signInSaga);
  yield takeEvery(AUTH.TOKEN_REFRESH, tokenRefreshSaga);
}
