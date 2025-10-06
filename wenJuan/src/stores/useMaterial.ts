import { defineStore } from 'pinia';
import defaultStatusMap from '@/configs/defaultStatus/DefaultStatusMap';
import type { MaterialComStatus } from '@/types';
import { updateInitStatusBeforeAdd } from '@/utils';
import * as EditUtils from '@/utils/editActions';

const keyToInit = ['personal-info-gender', 'personal-info-education']

const initializedStates: { [key: string]: MaterialComStatus } = {};

keyToInit.forEach((key) => {
  const defaultStatus = defaultStatusMap[key as keyof typeof defaultStatusMap]() as MaterialComStatus;
  updateInitStatusBeforeAdd(defaultStatus, key);
  initializedStates[key] = defaultStatus;
});

export const useMaterialStore = defineStore('material', {
  state: () => ({
    currentCom: 'single-select' as string,
    //业务组件
    coms: {
      'single-select': defaultStatusMap['single-select'](),
      'single-pic-select': defaultStatusMap['single-pic-select'](),
      'multi-select': defaultStatusMap['multi-select'](),
      'multi-pic-select': defaultStatusMap['multi-pic-select'](),
      'option-select': defaultStatusMap['option-select'](),
      'text-note': defaultStatusMap['text-note'](),
      'personal-info-gender': initializedStates['personal-info-gender'],
      'personal-info-education': initializedStates['personal-info-education'],
    } as any,
  }),
  actions: {
    setCurrentSurveyCom(name: string){
      this.currentCom = name;
    },
    
    // 更新文本状态 (title, desc, titleColor, descColor)
    updateTextStatus(configKey: string, payload: string) {
      const currentComData = this.coms[this.currentCom];
      EditUtils.updateTextStatus(currentComData, configKey, payload);
    },
    
    // 🔥 扩展：添加选项（兼容不同类型）
    addOption(configKey: string, newOption?: string) {
      const currentComData = this.coms[this.currentCom];
      EditUtils.addOption(currentComData, configKey, newOption);
    },
    
    // 🔥 扩展：删除选项（兼容不同类型）
    removeOption(configKey: string, index: number) {
      const currentComData = this.coms[this.currentCom];
      return EditUtils.removeOption(currentComData, configKey, index);
    },
    
    // 🔥 扩展：更新单个选项（兼容不同类型）
    updateSingleOption(configKey: string, index: number, value: string) {
      const currentComData = this.coms[this.currentCom];
      EditUtils.updateSingleOption(currentComData, configKey, index, value);
    },

    //更新currentIndex
    updateCurrentIndex(configKey: string, index: number) {
      const currentComData = this.coms[this.currentCom];
      EditUtils.updateCurrentIndex(currentComData, configKey, index, (typeIndex) => {
        this.toggleTitleDescShow(typeIndex);
      });
    },

    // 🔥 图片相关的专门方法
    //更新图片链接
    updatePicStatus(configKey: string, index: number, value: string) {
      const currentComData = this.coms[this.currentCom];
      EditUtils.updatePicStatus(currentComData, configKey, index, value);
    },
    
    // 🔥 新增：更新图片标题
    updatePicTitle(configKey: string, index: number, value: string) {
      const currentComData = this.coms[this.currentCom];
      EditUtils.updatePicTitle(currentComData, configKey, index, value);
    },
    
    // 🔥 新增：更新图片描述
    updatePicDesc(configKey: string, index: number, value: string) {
      const currentComData = this.coms[this.currentCom];
      EditUtils.updatePicDesc(currentComData, configKey, index, value);
    },
    
    // 🔥 新增：删除图片
    deletePicImage(configKey: string, index: number) {
      const currentComData = this.coms[this.currentCom];
      EditUtils.deletePicImage(currentComData, configKey, index);
    },

    //切换标题和描述的显示
    toggleTitleDescShow(typeIndex: number) {
      const currentComData = this.coms[this.currentCom];
      EditUtils.toggleTitleDescShow(currentComData, typeIndex);
    },
  },
});
