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
      newState.email = action.payload.id;
      return newState;
    case AUTH.SIGN_OUT:
      return initialState;
    case AUTH.TOKEN_REFRESH:
      newState.token = action.payload;
      return newState;
    default:
      return state;
  }
};

export default reducer;
