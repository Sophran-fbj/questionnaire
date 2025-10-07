import { defineStore } from 'pinia';
import defaultStatusMap from '@/configs/defaultStatus/DefaultStatusMap';
import type { MaterialComStatus, TextConfigKey, OptionsConfigKey, SurveyDBData, tn } from '@/types';
import { updateInitStatusBeforeAdd } from '@/utils';
import { isSurveyComName } from '../types';
import * as EditUtils from '@/utils/editActions';
import textNoteDefaultStatus from '@/configs/defaultStatus/TextNote';
import { getSurveyById, saveSurvey, updateSurveyById } from '@/database/operation';

const keyToInit = ['personal-info-gender', 'personal-info-education'];
const initializedStates: { [key: string]: MaterialComStatus } = {};
keyToInit.forEach((key) => {
  const defaultStatus = defaultStatusMap[
    key as keyof typeof defaultStatusMap
  ]() as MaterialComStatus;
  updateInitStatusBeforeAdd(defaultStatus, key);
  initializedStates[key] = defaultStatus;
});

const initStatus = () => {
  const initComs: MaterialComStatus[] = [];
  const com1 = textNoteDefaultStatus() as tn;
  com1.status.title.status = '问卷标题';
  com1.status.type.currentIndex = 0;
  com1.status.titleWeight.currentIndex = 0;
  const com2 = textNoteDefaultStatus() as tn;
  com2.status.desc.status = '为了给您提供更好的服务，希望您能抽出几分钟时间，将您的感受和建议告诉我们，我们非常重视每位用户的宝贵意见，期待您的参与！现在我们就马上开始吧！';
  initComs.push(com1);
  initComs.push(com2);
  return initComs;
};

export const useEditorStore = defineStore('editor', {
  state: () => ({
    currentComponentIndex: -1, // 当前选中的组件索引，一开始都没有选中，所以是-1
    surveyCount: 0, // 问卷题目的数量
    coms: initStatus() as MaterialComStatus[], // 问卷题目的数组
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
    resetComs() {
      this.coms = initStatus();
      this.surveyCount = 0;
      this.currentComponentIndex = -1;
    },
    setComs(data: SurveyDBData) {
      this.coms = data.coms;
      this.surveyCount = data.surveyCount;
      this.currentComponentIndex = -1;
    },
    //数据库操作
    saveComs(data: SurveyDBData) {
      return saveSurvey(data);
    },
    updateComs(id: number, data: Partial<SurveyDBData>){
      return updateSurveyById(id, data);
    },
    getComsById(id: number) {
      return getSurveyById(id);
    },
    // 获取当前选中的组件（辅助方法）
    getCurrentComponent() {
      if (this.currentComponentIndex >= 0 && this.currentComponentIndex < this.coms.length) {
        return this.coms[this.currentComponentIndex];
      }
      return null;
    },

    // 更新文本状态 (title, desc, titleColor, descColor)
    updateTextStatus(configKey: TextConfigKey, payload: string) {
      const currentComData = this.getCurrentComponent();
      EditUtils.updateTextStatus(currentComData, configKey, payload);
    },
    
    // 🔥 扩展：添加选项（兼容不同类型）
    addOption(configKey: OptionsConfigKey, newOption?: string) {
      const currentComData = this.getCurrentComponent();
      EditUtils.addOption(currentComData, configKey, newOption);
    },
    
    // 🔥 扩展：删除选项（兼容不同类型）
    removeOption(configKey: OptionsConfigKey, index: number) {
      const currentComData = this.getCurrentComponent();
      return EditUtils.removeOption(currentComData, configKey, index);
    },
    
    // 🔥 扩展：更新单个选项（兼容不同类型）
    updateSingleOption(configKey: OptionsConfigKey, index: number, value: string) {
      const currentComData = this.getCurrentComponent();
      EditUtils.updateSingleOption(currentComData, configKey, index, value);
    },

    //更新currentIndex
    updateCurrentIndex(configKey: OptionsConfigKey, index: number) {
      const currentComData = this.getCurrentComponent();
      EditUtils.updateCurrentIndex(currentComData, configKey, index, (typeIndex) => {
        this.toggleTitleDescShow(typeIndex);
      });
    },

    // 🔥 图片相关的专门方法
    //更新图片链接
    updatePicStatus(configKey: OptionsConfigKey, index: number, value: string) {
      const currentComData = this.getCurrentComponent();
      EditUtils.updatePicStatus(currentComData, configKey, index, value);
    },
    
    // 🔥 新增：更新图片标题
    updatePicTitle(configKey: OptionsConfigKey, index: number, value: string) {
      const currentComData = this.getCurrentComponent();
      EditUtils.updatePicTitle(currentComData, configKey, index, value);
    },
    
    // 🔥 新增：更新图片描述
    updatePicDesc(configKey: OptionsConfigKey, index: number, value: string) {
      const currentComData = this.getCurrentComponent();
      EditUtils.updatePicDesc(currentComData, configKey, index, value);
    },
    
    // 🔥 新增：删除图片
    deletePicImage(configKey: OptionsConfigKey, index: number) {
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
