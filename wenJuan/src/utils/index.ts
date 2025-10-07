import type { TextProps, OptionsProps, MaterialComStatus, SurveyDBData } from '@/types';
import { isStringArray, isPicTitleDescArray, IsOptionsStatus, type BaseStatus } from '@/types';
import { genderStatus, educationStatus } from '@/configs/defaultStatus/initStatus';
import type { TableColumnCtx } from 'element-plus';
import { componentMap } from '@/configs/componentMap';

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

// 处理日期格式的辅助方法
export function formatDate(
  row: SurveyDBData,
  column: TableColumnCtx<SurveyDBData>,
  cellValue: number,
) {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };
  return new Intl.DateTimeFormat('zh-CN', options).format(new Date(cellValue));
}

//还原组件状态
export function restoreComponentStatus(coms: MaterialComStatus[]) {
  coms.forEach((com) => {
    // 还原业务组件
    com.type = componentMap[com.name as keyof typeof componentMap];
    
    // 还原编辑组件
    const status = com.status as BaseStatus;
    for (const key in status) {
      const prop = status[key as keyof BaseStatus];
      if (prop && typeof prop === 'object' && 'name' in prop) {
        const editorName = prop.name as keyof typeof componentMap;
        (prop as any).editCom = componentMap[editorName];
      }
    }
  });
}

