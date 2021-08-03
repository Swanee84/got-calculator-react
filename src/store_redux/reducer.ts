import { combineReducers } from 'redux';
import auth from './auth/reducer';

const rootReducer = combineReducers({
  auth,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
