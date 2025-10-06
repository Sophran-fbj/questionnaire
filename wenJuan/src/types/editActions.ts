// 编辑操作的抽象接口
export interface EditActionsInterface {
  // 文本操作
  updateTextStatus(configKey: string, payload: string): void;
  
  // 选项操作  
  addOption(configKey: string, newOption?: string): void;
  removeOption(configKey: string, index: number): { success: boolean; message: string };
  updateSingleOption(configKey: string, index: number, value: string): void;
  
  // 当前索引操作
  updateCurrentIndex(configKey: string, index: number): void;
  
  // 图片操作
  updatePicStatus(configKey: string, index: number, value: string): void;
  updatePicTitle(configKey: string, index: number, value: string): void;
  updatePicDesc(configKey: string, index: number, value: string): void;
  deletePicImage(configKey: string, index: number): void;
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