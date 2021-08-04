import Basic from './basic';

export default interface ICode extends Basic {
  id: number;
  parentCode: string;
  code: string;
  codeName: string;
  value1?: string;
  value2?: string;
  sort?: number;

  codeDetails?: ICode[];
}

export interface CodeCardProps {
  cardType: string;
  list?: ICode[];
  selectedCodeCallback: (selectedCode: ICode) => void;
  parentCode: string;
}

export interface NameForCode {
  [key: string]: string;
}

export interface CodeFormProps {
  modalVisible: boolean;
  onSubmit: (isCreate: boolean, fieldsValue: ICode) => Promise<boolean>;
  onCancel: () => void;
  isCreate: boolean;
  values?: Partial<ICode>;
  refreshCodeList: () => void;
  cardType: string;
}
