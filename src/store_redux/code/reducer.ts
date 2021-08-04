import ICode, { NameForCode } from '@/models/code';
import { CODE, ICodeState, CodeRequest } from './action';

const initialState: ICodeState = {
  codeList: [],
  nameForCode: {},
  rootCodeList: [],
  getCodeGroup: (codeList, code) => {
    console.log('getCodeGroup Search Code :: ', code);
    const returnCode: ICode[] = [];

    codeList.forEach((value) => {
      if (code === value.parentCode && value.status === 'NORMAL') {
        returnCode.push(value);
      }
    });

    return returnCode;
  },
};

const reducer = (state = initialState, action: CodeRequest): ICodeState => {
  console.log('code reducer dispatch >>', action);
  switch (action.type) {
    case CODE.GET:
      return state;
    case CODE.INSERT:
      return state;
    case CODE.UPDATE:
      return state;
    case CODE.DELETE:
      return state;
    case CODE.REORDER:
      return state;
    case CODE.FINISH: {
      const newState = { ...state };
      const dataList = action.payload.dataList;
      const nameForCode: NameForCode = {};
      const rootList: ICode[] = [];

      dataList.forEach((value: ICode) => {
        if (value.code && value.codeName && value.status === 'NORMAL') {
          nameForCode[value.code] = value.codeName; // codeName 은 not null
        }
      });
      dataList.forEach((value: ICode) => {
        if (value.parentCode === 'ROOT') {
          rootList.push(value);
        } else {
          const rootCode = dataList.find((sub_value: ICode) => {
            return sub_value.code === value.parentCode;
          });
          if (!rootCode) {
            return;
          }
          if (!rootCode.codeDetails) {
            rootCode.codeDetails = [];
          }
          rootCode.codeDetails.push(value);
        }
      });
      newState.codeList = dataList;
      newState.nameForCode = nameForCode;
      newState.rootCodeList = rootList;
      return newState;
    }
    default:
      return state;
  }
};

export default reducer;
