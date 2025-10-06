import type { TextProps, OptionsProps, MaterialComStatus } from '@/types';
import { isStringArray, isPicTitleDescArray } from '@/types';
import { IsOptionsStatus } from '@/types';
import { genderStatus, educationStatus } from '@/configs/defaultStatus/initStatus';

export function getTextStatus(props: TextProps) {
  // // 防御性检查：确保props和status存在
  // return props?.status || '';
  return props.status;
}
export function getStringStatus(props: OptionsProps) {
  // // 防御性检查：确保props和status存在，返回空数组避免渲染错误
  return props?.status || [];
}
export function getCurrentStatus(props: OptionsProps) {
  // // 防御性检查：确保props和currentIndex存在，返回默认值0
  return props?.currentIndex ?? 0;
}
export function getStringStatusByCurrentIndex(props: OptionsProps) {
  // // 防御性检查：确保props存在且status是字符串数组
  if (props && isStringArray(props.status)) {
    return props.status[props.currentIndex] || '';
  }
}
export function getPicTitleDescStatus(props: OptionsProps) {
  // // 防御性检查：确保props存在且status是图片数组
  if(props && isPicTitleDescArray(props.status)){
    return props.status;
  }
}
export function updateInitStatusBeforeAdd(comStatus: MaterialComStatus, newMaterialName: string) {
  switch (newMaterialName) {
    case 'personal-info-gender': {
      comStatus.name = 'personal-info-gender';
      comStatus.status.title.status = '您的性别是？';
      if (IsOptionsStatus(comStatus.status)) comStatus.status.options.status = genderStatus();
      break;
    }
    case 'personal-info-education': {
      comStatus.name = 'personal-info-education';
      comStatus.status.title.status = '到目前为止，您的最高学历是？';
      if (IsOptionsStatus(comStatus.status)) comStatus.status.options.status = educationStatus();
      break;
    }
  }
}