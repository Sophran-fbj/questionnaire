<template>
  <div class="layout-container flex">
    <!-- 选择具体的业务组件 -->
    <div class="left flex wrap space-between">
      <slot />
    </div>
    <!-- 显示对应的业务组件 -->
    <div class="center">
      <slot name="center">
        <Router-View v-slot="{ Component }">
          <component :is="Component" :status="currentCom.status" :serialNum="1" />
        </Router-View>
      </slot>
    </div>
    <!-- 编辑面板 -->
    <div class="right">
      <EditorPanel :com="currentCom" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, provide } from 'vue';
import { useMaterialStore } from '@/stores/useMaterial';
import EditorPanel from '@/components/SurveyComs/EditItems/EditorPanel.vue';
import type { EditActionsInterface, TextConfigKey, OptionsConfigKey } from '@/types';
import { EDIT_ACTIONS_KEY } from '@/types';

const materialStore = useMaterialStore();
const currentCom = computed(() => materialStore.coms[materialStore.currentCom]);

// 实现EditActions接口 - MaterialStore版本
const editActions: EditActionsInterface = {
  updateTextStatus: (configKey: TextConfigKey, payload: string) => {
    materialStore.updateTextStatus(configKey, payload);
  },
  
  addOption: (configKey: OptionsConfigKey, newOption?: string) => {
    materialStore.addOption(configKey, newOption);
  },
  
  removeOption: (configKey: OptionsConfigKey, index: number) => {
    return materialStore.removeOption(configKey, index);
  },
  
  updateSingleOption: (configKey: OptionsConfigKey, index: number, value: string) => {
    materialStore.updateSingleOption(configKey, index, value);
  },
  
  updateCurrentIndex: (configKey: OptionsConfigKey, index: number) => {
    materialStore.updateCurrentIndex(configKey, index);
  },
  
  updatePicStatus: (configKey: OptionsConfigKey, index: number, value: string) => {
    materialStore.updatePicStatus(configKey, index, value);
  },
  
  updatePicTitle: (configKey: OptionsConfigKey, index: number, value: string) => {
    materialStore.updatePicTitle(configKey, index, value);
  },
  
  updatePicDesc: (configKey: OptionsConfigKey, index: number, value: string) => {
    materialStore.updatePicDesc(configKey, index, value);
  },
  
  deletePicImage: (configKey: OptionsConfigKey, index: number) => {
    materialStore.deletePicImage(configKey, index);
  }
};

// 提供编辑操作接口
provide(EDIT_ACTIONS_KEY, editActions);
</script>

<style scoped lang="scss">
.layout-container {
  width: 100%;
  // Header组件高度50px，h1高度50px，上下margin 20px，最后20px是额外多减去一部分，避免贴底
  height: calc(100vh - 100px - 40px - 20px);
  align-items: flex-start;
  border: 1px solid var(--border-color);
  border-top-right-radius: var(--border-radius-lg);
  border-bottom-left-radius: var(--border-radius-lg);
  border-bottom-right-radius: var(--border-radius-lg);
}
.left {
  width: 180px;
  text-align: center;
  align-items: flex-start;
  padding: 20px;
}
.center {
  width: 550px;
  // 多减去的60px是上下的padding，，最后20px是额外多减去一部分，避免贴底
  height: calc(100vh - 100px - 40px - 60px - 20px);
  overflow-y: scroll;
  padding: 30px;
  border-left: 1px solid var(--border-color);
}
.right {
  width: 350px;
  height: calc(100vh - 100px - 40px - 20px);
  overflow-y: scroll;
  border-left: 1px solid var(--border-color);
}
</style>
