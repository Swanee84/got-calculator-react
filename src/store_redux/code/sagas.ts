import { call, put, takeEvery } from 'redux-saga/effects';
import axios from '@/common/axios';
import ICode from '@/models/code';
import { CODE, CodeRequest, getCodeList, insertCode, updateCode, deleteCode, reorderCodeList, finishCode } from './action';
import { setLoading } from '@/store_redux/auth/action';

const getCodeListRequest = () => {
  const response = axios.get('code');
  return response;
};

const insertCodeRequest = (code: ICode) => {
  const response = axios.post('code', code);
  return response;
};

const updateCodeRequest = (code: ICode) => {
  console.log('업데이트할 code 정보 >> ', code);
  const response = axios.patch(`code/${code.id}`, code);
  return response;
};

const deleteCodeRequest = (codeId: number) => {
  const response = axios.delete(`code/${codeId}`);
  return response;
};

const reorderCodeRequest = (codeList: ICode[]) => {
  const response = axios.post('code', codeList);
  return response;
};

function* getCodeSaga(action: CodeRequest) {
  try {
    const { data } = yield call(getCodeListRequest);
    yield put(finishCode(data));
    yield put(setLoading(false));
  } catch (e) {
    console.log(e);
    yield put(finishCode([]));
    yield put(setLoading(false));
  }
}

function* insertCodeSaga(action: CodeRequest) {
  if (action.type !== CODE.INSERT) {
    return;
  }
  try {
    const { data } = yield call(insertCodeRequest, action.payload);
    yield put(finishCode(data));
    yield put(setLoading(false));
  } catch (e) {
    console.log(e);
    yield put(finishCode([]));
  }
}

function* updateCodeSaga(action: CodeRequest) {
  if (action.type !== CODE.UPDATE) {
    return;
  }
  try {
    const code = action.payload;
    const { data } = yield call(updateCodeRequest, code);
    yield put(finishCode(data));
    yield put(setLoading(false));
  } catch (e) {
    console.log(e);
    yield put(finishCode([]));
  }
}

function* deleteCodeSaga(action: CodeRequest) {
  if (action.type !== CODE.DELETE) {
    return;
  }
  try {
    const { data } = yield call(deleteCodeRequest, action.payload);
    yield put(finishCode(data));
    yield put(setLoading(false));
  } catch (e) {
    console.log(e);
    yield put(finishCode([]));
  }
}

function* reorderCodeSaga(action: CodeRequest) {
  if (action.type !== CODE.REORDER) {
    return;
  }
  try {
    yield call(deleteCodeRequest, action.payload);
    const { data } = yield call(getCodeListRequest);
    yield put(finishCode(data));
    yield put(setLoading(false));
  } catch (e) {
    console.log(e);
    yield put(finishCode([]));
  }
}

export default function* codeSaga() {
  yield takeEvery(CODE.GET, getCodeSaga);
  yield takeEvery(CODE.INSERT, insertCodeSaga);
  yield takeEvery(CODE.UPDATE, updateCodeSaga);
  yield takeEvery(CODE.DELETE, deleteCodeSaga);
  yield takeEvery(CODE.REORDER, reorderCodeSaga);
}
