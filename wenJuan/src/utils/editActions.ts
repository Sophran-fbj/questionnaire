// 编辑操作的公共工具函数
// 将编辑逻辑与Store解耦，提高复用性

import type { 
  MaterialComStatus, 
  OptionsProps, 
  StringStatusArr, 
  PicTitleDescStatusArr 
} from '@/types';

/**
 * 更新文本状态 (title, desc, titleColor, descColor)
 */
export function updateTextStatus(
  currentComData: MaterialComStatus | null, 
  configKey: string, 
  payload: string
): void {
  if (currentComData) {
    (currentComData.status as any)[configKey].status = payload;
  }
}

/**
 * 添加选项（兼容不同类型）
 */
export function addOption(
  currentComData: MaterialComStatus | null,
  configKey: string,
  newOption?: string
): void {
  if (!currentComData) return;
  
  const prop = (currentComData.status as any)[configKey] as OptionsProps;
  
  if (Array.isArray(prop.status)) {
    // 判断选项类型并添加对应的默认选项
    if (prop.status.length > 0) {
      const firstItem = prop.status[0];
      
      if (typeof firstItem === 'string') {
        // StringStatusArr 类型
        (prop.status as StringStatusArr).push(newOption || '新选项');
      } else if (firstItem && typeof firstItem === 'object' && 'picTitle' in firstItem) {
        // PicTitleDescStatusArr 类型
        (prop.status as PicTitleDescStatusArr).push({
          picTitle: `图片标题${prop.status.length + 1}`,
          picDesc: '说明（选填，限24字）',
          value: ''
        });
      } else if (firstItem && typeof firstItem === 'object' && 'value' in firstItem && 'status' in firstItem) {
        // ValueStatusArr 类型
        (prop.status as any).push({
          value: `选项${prop.status.length + 1}`,
          status: newOption || '新选项'
        });
      }
    }
  }
}

/**
 * 删除选项（兼容不同类型）
 */
export function removeOption(
  currentComData: MaterialComStatus | null,
  configKey: string,
  index: number
): { success: boolean; message: string } {
  if (!currentComData) {
    return { success: false, message: '未选中组件' };
  }
  
  const prop = (currentComData.status as any)[configKey] as OptionsProps;
  
  if (Array.isArray(prop.status) && prop.status.length > 2) {
    prop.status.splice(index, 1);
    
    // 如果删除的是当前选中的选项，需要调整 currentIndex
    if (prop.currentIndex >= prop.status.length) {
      prop.currentIndex = prop.status.length - 1;
    }
    
    return { success: true, message: '选项删除成功' };
  } else {
    return { success: false, message: '至少需要保留两个选项' };
  }
}

/**
 * 更新单个选项（兼容不同类型）
 */
export function updateSingleOption(
  currentComData: MaterialComStatus | null,
  configKey: string,
  index: number,
  value: string
): void {
  if (!currentComData) return;
  
  const prop = (currentComData.status as any)[configKey] as OptionsProps;
  
  if (Array.isArray(prop.status) && prop.status[index]) {
    const item = prop.status[index];
    
    if (typeof item === 'string') {
      // StringStatusArr 类型
      (prop.status as StringStatusArr)[index] = value;
    } else if (item && typeof item === 'object' && 'status' in item) {
      // ValueStatusArr 类型
      (item as any).status = value;
    }
    // PicTitleDescStatusArr 类型的文本更新由专门的方法处理
  }
}

/**
 * 更新当前索引
 */
export function updateCurrentIndex(
  currentComData: MaterialComStatus | null,
  configKey: string,
  index: number,
  onTextNoteTypeChange?: (typeIndex: number) => void
): void {
  if (!currentComData) return;
  
  const prop = (currentComData.status as any)[configKey] as OptionsProps;
  prop.currentIndex = index;
  
  // 🔥 特殊处理：如果是 text-note 组件的 type 切换
  if (currentComData.name === 'text-note' && configKey === 'type' && onTextNoteTypeChange) {
    onTextNoteTypeChange(index);
  }
}

/**
 * 更新图片链接
 */
export function updatePicStatus(
  currentComData: MaterialComStatus | null,
  configKey: string,
  index: number,
  value: string
): void {
  if (!currentComData) return;
  
  const prop = (currentComData.status as any)[configKey] as OptionsProps;
  (prop.status as PicTitleDescStatusArr)[index].value = value;
}

/**
 * 更新图片标题
 */
export function updatePicTitle(
  currentComData: MaterialComStatus | null,
  configKey: string,
  index: number,
  value: string
): void {
  if (!currentComData) return;
  
  const prop = (currentComData.status as any)[configKey] as OptionsProps;
  (prop.status as PicTitleDescStatusArr)[index].picTitle = value;
}

/**
 * 更新图片描述
 */
export function updatePicDesc(
  currentComData: MaterialComStatus | null,
  configKey: string,
  index: number,
  value: string
): void {
  if (!currentComData) return;
  
  const prop = (currentComData.status as any)[configKey] as OptionsProps;
  (prop.status as PicTitleDescStatusArr)[index].picDesc = value;
}

/**
 * 删除图片
 */
export function deletePicImage(
  currentComData: MaterialComStatus | null,
  configKey: string,
  index: number
): void {
  if (!currentComData) return;
  
  const prop = (currentComData.status as any)[configKey] as OptionsProps;
  (prop.status as PicTitleDescStatusArr)[index].value = '';
}

/**
 * 切换标题和描述的显示
 */
export function toggleTitleDescShow(
  currentComData: MaterialComStatus | null,
  typeIndex: number
): void {
  if (currentComData?.status) {
    // typeIndex: 0=标题, 1=描述
    const showTitle = typeIndex === 0;
    
    // 遍历所有状态项，切换以 title 和 desc 开头的编辑器
    Object.keys(currentComData.status).forEach(key => {
      if (key.startsWith('title')) {
        (currentComData.status as any)[key].isShow = showTitle;
      } else if (key.startsWith('desc')) {
        (currentComData.status as any)[key].isShow = !showTitle;
      }
    });
  }
}
