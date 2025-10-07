<template>
  <div>
    <div class="header">
      <Header :isEditor="true" :id="id" />
    </div>
    <!-- 编辑器主体区域 -->
    <div class="container">
      <LeftSide />
      <RightSide />
    </div>
    <div>
      <Center />
    </div>
  </div>
</template>

<script setup lang="ts">
import { provide, computed } from 'vue';
import { useRoute } from 'vue-router';
import Header from '@/components/Common/Header.vue';
import LeftSide from '@/views/EditorView/LeftSide/Index.vue';
import Center from '@/views/EditorView/Center.vue';
import RightSide from '@/views/EditorView/RightSide.vue';
import { useEditorStore } from '@/stores/useEditor';
import type { EditActionsInterface, TextConfigKey, OptionsConfigKey } from '@/types';
import { EDIT_ACTIONS_KEY } from '@/types';

const route = useRoute();
const id = computed(() => route.params.id ? String(route.params.id) : '');

const editorStore = useEditorStore();

// 🔥 在父组件中提供 editActions，使得所有子组件（Center 和 RightSide）都能访问
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

// 提供编辑操作接口给所有子组件
provide(EDIT_ACTIONS_KEY, editActions);
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  background-color: var(--white);
  position: fixed;
  top: 0;
  z-index: 10;
}
.container {
  width: calc(100vw - 40px);
  padding: 20px;
  // Header的高度50px，上下padding 20px
  height: calc(100vh - 50px - 40px);
  background: url('@/assets/image/editor_background.png');
  position: fixed;
  top: 50px;
}
</style>
