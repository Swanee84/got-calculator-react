import { AUTH, IAuthState, AuthRequest } from './action';

const initialState: IAuthState = {
  token: '',
  email: '',
  name: '',
  guildCode: '',
  role: '',
  isAuth: false,
};

const reducer = (state = initialState, action: AuthRequest): IAuthState => {
  console.log('auth reducer dispatch >>', action);
  switch (action.type) {
    case AUTH.SIGN_IN:
      return state;
    case AUTH.SIGN_IN_SUCCESS:
      return setAuthNewState(state, action.payload.user, action.payload.token);
    case AUTH.SIGN_IN_FAIL:
      return initialState;
    case AUTH.SIGN_OUT:
      return initialState;
    case AUTH.TOKEN_REFRESH:
      return state;
    default:
      return state;
  }
};

const setAuthNewState = (state: IAuthState, user: any, token: string) => {
  console.log('payload.user >>', user);
  localStorage.token = token;
  const newState = { ...state };
  newState.token = token;
  newState.name = user.name;
  newState.role = user.role;
  newState.email = user.email;
  newState.guildCode = user.guildCode;
  newState.isAuth = true;
  return newState;
};

export default reducer;
