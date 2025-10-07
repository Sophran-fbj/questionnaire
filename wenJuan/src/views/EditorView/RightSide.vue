<template>
  <div class="right-side-container">
    <div
      v-if="editorStore.currentComponentIndex === -1"
      class="content flex justify-content-center align-items-center"
    >
      点击题型进行编辑
    </div>
    <div v-else>
      <EditPannel :com="editorStore.coms[editorStore.currentComponentIndex]" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { provide } from 'vue';
import EditPannel from '@/components/SurveyComs/EditItems/EditorPanel.vue';
import { useEditorStore } from '@/stores/useEditor';
import type { EditActionsInterface, TextConfigKey, OptionsConfigKey } from '@/types';
import { EDIT_ACTIONS_KEY } from '@/types';

const editorStore = useEditorStore();

// 实现EditActions接口 - EditorStore版本
const editActions: EditActionsInterface = {
  updateTextStatus: (configKey: TextConfigKey, payload: string) => {
    editorStore.updateTextStatus(configKey, payload);
  },
  
  addOption: (configKey: OptionsConfigKey, newOption?: string) => {
    editorStore.addOption(configKey, newOption);
  },
  
  removeOption: (configKey: OptionsConfigKey, index: number) => {
    return editorStore.removeOption(configKey, index);
  },
  
  updateSingleOption: (configKey: OptionsConfigKey, index: number, value: string) => {
    editorStore.updateSingleOption(configKey, index, value);
  },
  
  updateCurrentIndex: (configKey: OptionsConfigKey, index: number) => {
    editorStore.updateCurrentIndex(configKey, index);
  },
  
  updatePicStatus: (configKey: OptionsConfigKey, index: number, value: string) => {
    editorStore.updatePicStatus(configKey, index, value);
  },
  
  updatePicTitle: (configKey: OptionsConfigKey, index: number, value: string) => {
    editorStore.updatePicTitle(configKey, index, value);
  },
  
  updatePicDesc: (configKey: OptionsConfigKey, index: number, value: string) => {
    editorStore.updatePicDesc(configKey, index, value);
  },
  
  deletePicImage: (configKey: OptionsConfigKey, index: number) => {
    editorStore.deletePicImage(configKey, index);
  }
};

// 提供编辑操作接口
provide(EDIT_ACTIONS_KEY, editActions);
</script>

<style scoped lang="scss">
.right-side-container {
  width: 320px;
  height: calc(100vh - 50px - 40px);
  position: fixed;
  right: 20px;
  top: 70px;
  background-color: var(--white);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-md);
  overflow-y: scroll;
}
.content {
  height: 100%;
}
</style>
