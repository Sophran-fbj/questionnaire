<template>
  <div>
    <div
      class="survey-com-item-container pointer flex justify-content-center align-items-center self-center pl-10 pr-10 mb-10"
      @click="handleAddCom"
    >
      {{ item.comName }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useEditorStore } from '@/stores/useEditor';
import defaultStatusMap from '@/configs/defaultStatus/DefaultStatusMap';
import type { Material } from '@/types';
import { updateInitStatusBeforeAdd } from '@/utils';
import EventBus from '@/utils/eventBus';
const editorStore = useEditorStore();
const props = defineProps<{
  item: {
    materialName: string;
    comName: string;
  };
}>();

const handleAddCom = () => {
  const newSurveyComName = props.item.materialName as Material;
  if (!newSurveyComName) {
    console.warn('请先选择题型');
    return;
  } 
  const newCom = defaultStatusMap[newSurveyComName]();
  updateInitStatusBeforeAdd(newCom, newSurveyComName);
  editorStore.addCom(newCom);
  EventBus.emit('scrollToBottom');
};
</script>

<style scoped lang="scss">
.survey-com-item-container {
  width: 60px;
  height: 30px;
  background-color: var(--background-color);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-base);
  color: var(--font-color-light);
  user-select: none;
}
.survey-com-item-container:hover {
  background-color: var(--font-color-lightest);
}
</style>
