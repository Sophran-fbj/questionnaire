import type { TextConfigKey, OptionsConfigKey } from './configKeys';

// 编辑操作的抽象接口
export interface EditActionsInterface {
  // 文本操作（针对 title、desc、titleColor、descColor）
  updateTextStatus(configKey: TextConfigKey, payload: string): void;
  
  // 选项操作（针对 options、position、size、weight、italic 等）
  addOption(configKey: OptionsConfigKey, newOption?: string): void;
  removeOption(configKey: OptionsConfigKey, index: number): { success: boolean; message: string };
  updateSingleOption(configKey: OptionsConfigKey, index: number, value: string): void;
  
  // 当前索引操作（切换选中的选项）
  updateCurrentIndex(configKey: OptionsConfigKey, index: number): void;
  
  // 图片操作（专门针对图片选项）
  updatePicStatus(configKey: 'options', index: number, value: string): void;
  updatePicTitle(configKey: 'options', index: number, value: string): void;
  updatePicDesc(configKey: 'options', index: number, value: string): void;
  deletePicImage(configKey: 'options', index: number): void;
}

// 注入的key
export const EDIT_ACTIONS_KEY = Symbol('edit-actions');
export const createEmptyEditActions = (): EditActionsInterface => ({
  updateTextStatus: () => {},
  addOption: () => {},
  removeOption: () => ({ success: false, message: 'No edit actions available' }),
  updateSingleOption: () => {},
  updateCurrentIndex: () => {},
  updatePicStatus: () => {},
  updatePicTitle: () => {},
  updatePicDesc: () => {},
  deletePicImage: () => {}
});