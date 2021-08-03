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
  const newState = { ...state };
  switch (action.type) {
    case AUTH.SIGN_IN:
      return newState;
    case AUTH.SIGN_IN_SUCCESS:
      return newState;
    case AUTH.SIGN_IN_FAIL:
      return newState;
    case AUTH.SIGN_OUT:
      return initialState;
    case AUTH.TOKEN_REFRESH:
      return newState;
    default:
      return state;
  }
};

export default reducer;
