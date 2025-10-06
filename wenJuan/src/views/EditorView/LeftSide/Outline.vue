<template>
  <div v-if="editorStore.surveyCount">
    <draggable v-model="editorStore.coms" item-key="id" @start="dragStart">
      <template #item="{ element, index }">
        <div
          class="mb-10"
          v-show="isSurveyComName(element.name)"
          :class="{
            active: editorStore.currentComponentIndex === index,
          }"
          @click="handleClick(index)"
        >
          <div class="item">
            {{ serialNum[index] }}.
            {{
              element.status.title.status.length > 10
                ? element.status.title.status.substring(0, 10) + '...'
                : element.status.title.status
            }}
          </div>
        </div>
      </template>
    </draggable>
  </div>
  <div v-else class="tip flex align-items-center justify-content-center">请添加题目</div>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable';
import { isSurveyComName } from '@/types';
import { useEditorStore } from '@/stores/useEditor';
import { getSerialNumber } from '@/utils/hooks';
import { computed } from 'vue';
import  EventBus  from '@/utils/eventBus';
const editorStore = useEditorStore();

const serialNum = computed(() => getSerialNumber(editorStore.coms));

const dragStart = () => {
  editorStore.setCurrentComponentIndex(-1);
};
const handleClick = (index: number) => {
  if (editorStore.currentComponentIndex === index) {
    editorStore.setCurrentComponentIndex(-1);
  } else {
    editorStore.setCurrentComponentIndex(index);
  }
  EventBus.emit('scrollToCenter', index);
};
</script>

<style scoped>
.item {
  /* outline: 1px solid black; */
  color: var(--font-color-light);
  font-size: var(--font-size-base);
  padding: 10px;
  cursor: pointer;
}
.tip {
  height: calc(100% - 50px);
}
.active {
  transform: scale(1.04);
  transition: 0.5s;
  background-color: var(--border-color);
  border-radius: var(--border-radius-lg);
}
</style>