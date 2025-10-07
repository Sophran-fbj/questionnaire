// 题目类型
export type SurveyComName =
  | 'single-select'
  | 'single-pic-select'
  | 'multi-select'
  | 'multi-pic-select'
  | 'option-select'
  | 'personal-info-gender'
  | 'personal-info-education';

// 业务组件类型(题目类型 + 非题目类型)
export type Material = SurveyComName | 'text-note';

// 记录题目类型的数组
export const SurveyComNameArr = [
  'single-select',
  'single-pic-select',
  'multi-select',
  'multi-pic-select',
  'option-select',
  'personal-info-gender',
  'personal-info-education',
];

// 判断传入的值是否为题目类型
export function isSurveyComName(value: string): value is SurveyComName {
  return SurveyComNameArr.includes(value as SurveyComName);
}

// 该数组记录适合生成PDF的题目类型
export const PDFComs = [
  'single-select',
  'single-pic-select',
  'personal-info-gender',
  'personal-info-education',
  'text-note',
];

// 判断组件是否能打印成PDF
export function isPDFCom(value: string): boolean {
  return PDFComs.includes(value as SurveyComName);
}