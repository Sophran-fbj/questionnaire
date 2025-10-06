/**
 * 配置键类型定义
 * 用于编辑操作的类型安全
 */

// 文本类配置键（status 为 string 的属性）
export type TextConfigKey = 
  | 'title'       // 标题文本
  | 'desc'        // 描述文本
  | 'titleColor'  // 标题颜色
  | 'descColor';  // 描述颜色

// 选项类配置键（status 为数组的属性）
export type OptionsConfigKey = 
  | 'options'      // 选项列表（选择题专用）
  | 'type'         // 类型切换（备注说明专用）
  | 'position'     // 对齐方式
  | 'titleSize'    // 标题字号
  | 'descSize'     // 描述字号
  | 'titleWeight'  // 标题粗细
  | 'descWeight'   // 描述粗细
  | 'titleItalic'  // 标题斜体
  | 'descItalic';  // 描述斜体

// 所有配置键的联合类型
export type ConfigKey = TextConfigKey | OptionsConfigKey;

