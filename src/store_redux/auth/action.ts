export class AUTH {
  public static readonly SIGN_IN = 'SIGN_IN' as const;
  public static readonly SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS' as const;
  public static readonly SIGN_IN_FAIL = 'SIGN_IN_FAIL' as const;
  public static readonly SIGN_OUT = 'SIGN_OUT' as const;
  public static readonly TOKEN_REFRESH = 'TOKEN_REFRESH' as const;
  public static readonly LOADING = 'LOADING' as const;
  // public static readonly = '' as const;
  // 주의: public static readonly SIGN_IN: string = 'SIGN_IN' as const; 과 같이 :string 타입을 지정하지 않는다.
  // https://react.vlpt.us/using-typescript/05-ts-redux.html, https://kyounghwan01.github.io/blog/TS/React/redux-ts/#package-json-%E1%84%89%E1%85%A5%E1%86%AF%E1%84%8E%E1%85%B5
}

export interface IAuthState {
  token: string;
  email: string;
  name: string;
  guildCode: string;
  role: string;
  isAuth: boolean;
  isLoading: boolean;
}

// 왠만하면 액션의 파라미터는 payload로 쓴다 FSA 규칙 준수 (https://readyfront.tistory.com/7)
export const signIn = (id: string, pw: string) => {
  return {
    type: AUTH.SIGN_IN,
    payload: { id, pw },
  };
};
export const signInSuccess = (payload: any) => {
  return {
    type: AUTH.SIGN_IN_SUCCESS,
    payload,
  };
};
export const signInFail = (payload: any) => {
  return {
    type: AUTH.SIGN_IN_FAIL,
    payload,
  };
};

export const signOut = () => {
  return {
    type: AUTH.SIGN_OUT,
  };
};

export const tokenRefresh = () => {
  return {
    type: AUTH.TOKEN_REFRESH,
  };
};

export const setLoading = (payload: boolean) => {
  return {
    type: AUTH.LOADING,
    payload,
  };
};

export type AuthRequest =
  | ReturnType<typeof signIn>
  | ReturnType<typeof signInSuccess>
  | ReturnType<typeof signInFail>
  | ReturnType<typeof signOut>
  | ReturnType<typeof tokenRefresh>
  | ReturnType<typeof setLoading>;
