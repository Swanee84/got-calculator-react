class ActionAuth {
  public static readonly SIGN_IN: string = 'SIGN_IN';
  public static readonly SIGN_OUT: string = 'SIGN_OUT';
  public static readonly TOKEN_REFRESH: string = 'TOKEN_REFRESH';
  // public static readonly : string = '';
}

class ActionCode {
  public static readonly GET_CODE: string = 'GET_CODE';
  public static readonly INSERT_CODE: string = 'INSERT_CODE';
  public static readonly UPDATE_CODE: string = 'UPDATE_CODE';
  public static readonly DELETE_CODE: string = 'DELETE_CODE';
  public static readonly REORDER_CODE: string = 'REORDER_CODE';
}

export default {
  AUTH: ActionAuth,
  CODE: ActionCode,
};
