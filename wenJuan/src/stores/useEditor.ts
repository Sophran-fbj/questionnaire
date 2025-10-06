import { defineStore } from 'pinia';
import defaultStatusMap from '@/configs/defaultStatus/DefaultStatusMap';
import type { MaterialComStatus } from '@/types';
import { updateInitStatusBeforeAdd } from '@/utils';
import { isSurveyComName } from '../types';
import * as EditUtils from '@/utils/editActions';
const keyToInit = ['personal-info-gender', 'personal-info-education'];

const initializedStates: { [key: string]: MaterialComStatus } = {};

keyToInit.forEach((key) => {
  const defaultStatus = defaultStatusMap[
    key as keyof typeof defaultStatusMap
  ]() as MaterialComStatus;
  updateInitStatusBeforeAdd(defaultStatus, key);
  initializedStates[key] = defaultStatus;
});

export const useEditorStore = defineStore('editor', {
  state: () => ({
    currentComponentIndex: -1, // 当前选中的组件索引，一开始都没有选中，所以是-1
    surveyCount: 0, // 问卷题目的数量
    coms: [] as MaterialComStatus[], // 问卷题目的数组
  }),
  actions: {
    addCom(newCom: MaterialComStatus) {
      this.coms.push(newCom);
      this.currentComponentIndex = -1;
      if (isSurveyComName(newCom.name)) this.surveyCount++;
    },
    setCurrentComponentIndex(index: number) {
      this.currentComponentIndex = index;
    },
    removeCom(index: number) {
      if (isSurveyComName(this.coms[index].name)) this.surveyCount--;
      this.coms.splice(index, 1);
      this.currentComponentIndex = -1;
    },
    // 获取当前选中的组件（辅助方法）
    getCurrentComponent() {
      if (this.currentComponentIndex >= 0 && this.currentComponentIndex < this.coms.length) {
        return this.coms[this.currentComponentIndex];
      }
      return null;
    },

    // 更新文本状态 (title, desc, titleColor, descColor)
    updateTextStatus(configKey: string, payload: string) {
      const currentComData = this.getCurrentComponent();
      EditUtils.updateTextStatus(currentComData, configKey, payload);
    },
    
    // 🔥 扩展：添加选项（兼容不同类型）
    addOption(configKey: string, newOption?: string) {
      const currentComData = this.getCurrentComponent();
      EditUtils.addOption(currentComData, configKey, newOption);
    },
    
    // 🔥 扩展：删除选项（兼容不同类型）
    removeOption(configKey: string, index: number) {
      const currentComData = this.getCurrentComponent();
      return EditUtils.removeOption(currentComData, configKey, index);
    },
    
    // 🔥 扩展：更新单个选项（兼容不同类型）
    updateSingleOption(configKey: string, index: number, value: string) {
      const currentComData = this.getCurrentComponent();
      EditUtils.updateSingleOption(currentComData, configKey, index, value);
    },

    //更新currentIndex
    updateCurrentIndex(configKey: string, index: number) {
      const currentComData = this.getCurrentComponent();
      EditUtils.updateCurrentIndex(currentComData, configKey, index, (typeIndex) => {
        this.toggleTitleDescShow(typeIndex);
      });
    },

    // 🔥 图片相关的专门方法
    //更新图片链接
    updatePicStatus(configKey: string, index: number, value: string) {
      const currentComData = this.getCurrentComponent();
      EditUtils.updatePicStatus(currentComData, configKey, index, value);
    },
    
    // 🔥 新增：更新图片标题
    updatePicTitle(configKey: string, index: number, value: string) {
      const currentComData = this.getCurrentComponent();
      EditUtils.updatePicTitle(currentComData, configKey, index, value);
    },
    
    // 🔥 新增：更新图片描述
    updatePicDesc(configKey: string, index: number, value: string) {
      const currentComData = this.getCurrentComponent();
      EditUtils.updatePicDesc(currentComData, configKey, index, value);
    },
    
    // 🔥 新增：删除图片
    deletePicImage(configKey: string, index: number) {
      const currentComData = this.getCurrentComponent();
      EditUtils.deletePicImage(currentComData, configKey, index);
    },

    //切换标题和描述的显示
    toggleTitleDescShow(typeIndex: number) {
      const currentComData = this.getCurrentComponent();
      EditUtils.toggleTitleDescShow(currentComData, typeIndex);
    },
  },
});
