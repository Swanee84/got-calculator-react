import { combineReducers } from 'redux';
import auth from './auth/reducer';
import code from './code/reducer';

const rootReducer = combineReducers({
  auth,
  code,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
