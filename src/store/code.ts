import { action, computed, makeAutoObservable, makeObservable, observable } from 'mobx';
import axios from '@/common/axios';
import ICode, { NameForCode } from '@/models/code';

class CodeMobx {
  codeList: ICode[] = [];
  nameForCode: NameForCode = {};

  constructor() {
    makeAutoObservable(this);
  }

  public downloadCodeList = async () => {
    console.log('mobx action getCodeList');

    const response = await axios.get('code').catch((e) => {
      return { data: null };
    });

    if (response && response.data && response.data.dataList) {
      const dataList = response.data.dataList;
      const nameForCode: NameForCode = {};
      const rootList: ICode[] = [];

      dataList.forEach((value: ICode) => {
        if (value.codeName) {
          nameForCode[value.code] = value.codeName;
        }
        if (value.parentCode === 'ROOT') {
          rootList.push(value);
        }
      });
      dataList.forEach((value: ICode) => {
        if (value.parentCode !== 'ROOT') {
          const rootCode = dataList.find((sub_value: ICode) => {
            return sub_value.code === value.parentCode;
          });
          if (!rootCode.codeDetails) {
            rootCode.codeDetails = [];
          }
          rootCode.codeDetails.push(value);
        }
      });
      this.codeList = dataList;
      this.nameForCode = nameForCode;
    }
  };

  public getCodeGroup = (code: string): ICode[] => {
    const returnCode: ICode[] = [];

    this.codeList.forEach((value) => {
      if (code === value.parentCode) {
        returnCode.push(value);
      }
    });

    return returnCode;
  };

  public getNameForCode = (code: string): string => {
    return this.nameForCode[code] || 'unknown';
  };

  get getCodeList() {
    console.log(this.codeList);
    return this.codeList;
  }

  get rootCodeGroupList() {
    return this.getCodeGroup('ROOT');
  }

  public deleteCode = async (code: string) => {
    const response = await axios.delete('');
  };
}

const code = new CodeMobx();
export default code;
