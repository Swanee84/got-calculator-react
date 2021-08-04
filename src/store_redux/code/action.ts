import ICode, { NameForCode } from '@/models/code';

export class CODE {
  public static readonly GET = 'GET_CODE' as const;
  public static readonly INSERT = 'INSERT_CODE' as const;
  public static readonly UPDATE = 'UPDATE_CODE' as const;
  public static readonly DELETE = 'DELETE_CODE' as const;
  public static readonly REORDER = 'REORDER_CODE' as const;
  public static readonly FINISH = 'FINISH_CODE' as const;
}

export interface ICodeState {
  codeList: ICode[];
  nameForCode: NameForCode;
  rootCodeList: ICode[];
  getCodeGroup: (codeList: ICode[], code: string) => ICode[];
}

export const getCodeList = () => {
  return {
    type: CODE.GET,
  };
};

export const insertCode = (payload: any) => {
  return {
    type: CODE.INSERT,
    payload,
  };
};

export const updateCode = (payload: any) => {
  return {
    type: CODE.UPDATE,
    payload,
  };
};

export const deleteCode = (payload: number) => {
  return {
    type: CODE.DELETE,
    payload,
  };
};

export const reorderCodeList = (payload: any) => {
  return {
    type: CODE.REORDER,
    payload,
  };
};

export const finishCode = (payload: any) => {
  return {
    type: CODE.FINISH,
    payload,
  };
};

export type CodeRequest =
  | ReturnType<typeof getCodeList>
  | ReturnType<typeof insertCode>
  | ReturnType<typeof updateCode>
  | ReturnType<typeof deleteCode>
  | ReturnType<typeof reorderCodeList>
  | ReturnType<typeof finishCode>;
