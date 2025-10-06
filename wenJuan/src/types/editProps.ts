import type { VueComType } from './common';

export interface BaseProps {
  id: string;
  isShow: boolean;
  name: string;
  editCom: VueComType;
}

export type StringStatusArr = Array<string>;
export type ValueStatusArr = Array<{ value: string; status: string }>;
export type PicTitleDescStatusArr = Array<{ picTitle: string; picDesc: string; value: string }>;
export type StatusArray = StringStatusArr | ValueStatusArr | PicTitleDescStatusArr;

export interface TextProps extends BaseProps {
  status: string;
}
export interface OptionsProps extends BaseProps {
  status: StringStatusArr | ValueStatusArr | PicTitleDescStatusArr;
  currentIndex: number;
}
export interface BaseStatus {
  title: TextProps;
  desc: TextProps;
  position: OptionsProps;
  titleSize: OptionsProps;
  descSize: OptionsProps;
  titleWeight: OptionsProps;
  descWeight: OptionsProps;
  titleItalic: OptionsProps;
  descItalic: OptionsProps;
  titleColor: TextProps;
  descColor: TextProps;
}

export interface OptionsStatus extends BaseStatus {
  options: OptionsProps;
}
export interface TextNoteStatus extends BaseStatus {
  type: OptionsProps;
}
export function IsOptionsStatus(status: BaseStatus): status is OptionsStatus {
  return 'options' in status;
}
// 类型谓词函数，用于检查 status 是否为 string[]
export function isStringArray(status: StatusArray): status is string[] {
  return Array.isArray(status) && (status.length === 0 || typeof status[0] === 'string');
}
// 类型谓词函数，用于检查 props 是否为 TextProps
export function isTextProps(props: TextProps | OptionsProps): props is TextProps {
  return typeof props.status === 'string';
}
// 类型谓词函数，用于检查 props 是否为 OptionsProps
export function isOptionsProps(props: TextProps | OptionsProps): props is OptionsProps {
  return props && Array.isArray(props.status);
}
// 类型谓词函数，用于检查 status 是否为 Array<{ value: string; status: string }>
export function isValueStatusArray(status: StatusArray): status is ValueStatusArr {
  return (
    Array.isArray(status) &&
    status.length > 0 &&
    typeof status[0] === 'object' &&
    'value' in status[0] &&
    'status' in status[0]
  )
}
// 类型谓词函数，用于检查 status 是否为 Array<{ picTitle: string; picDesc: string }>
export function isPicTitleDescArray(status: StatusArray): status is PicTitleDescStatusArr {
  return (
    Array.isArray(status) &&
    status.length > 0 &&
    typeof status[0] === 'object' &&
    'picTitle' in status[0] &&
    'picDesc' in status[0]
  )
}