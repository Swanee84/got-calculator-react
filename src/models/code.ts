import Basic from './basic';

export default interface ICode extends Basic {
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
}

export interface NameForCode {
  [key: string]: string;
}
