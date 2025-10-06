<template>
  <div ref="centerContainer" class="center-container">
    <draggable v-model="editorStore.coms" itemKey="id" @start="dragStart">
      <template #item="{ element, index }">
        <div
          class="content mb-10 relative"
          :class="{
            active: editorStore.currentComponentIndex === index,
          }"
          @click="handleClick(index)"
          :ref="(el) => (componentRefs[index] = el)"
        >
          <component :is="element.type" :status="element.status" :serialNum="serialNum[index]" />
          <!-- 删除按钮 -->
          <div class="absolute delete-btn" v-show="editorStore.currentComponentIndex === index">
            <el-button
              type="danger"
              class="ml-10"
              size="small"
              :icon="Close"
              circle
              @click.stop="removeCom(index)"
            />
          </div>
        </div>
      </template>
    </draggable>
  </div>
</template>
<script setup lang="ts">
import draggable from 'vuedraggable';
import { ref, nextTick, computed, type ComponentPublicInstance } from 'vue';
import { useEditorStore } from '@/stores/useEditor';
import EventBus from '@/utils/eventBus';
import { getSerialNumber } from '@/utils/hooks';
import { Close } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';

const centerContainer = ref<HTMLElement | null>(null);
const editorStore = useEditorStore();
const serialNum = computed(() => getSerialNumber(editorStore.coms));
const componentRefs = ref<(Element | ComponentPublicInstance | null)[]>([]);

const handleClick = (index: number) => {
  if (editorStore.currentComponentIndex === index) {
    editorStore.setCurrentComponentIndex(-1);
  } else {
    editorStore.setCurrentComponentIndex(index);
  }
  scrollToCenter(index);
};
const dragStart = () => {
  editorStore.setCurrentComponentIndex(-1);
};
const removeCom = (index: number) => {
  ElMessageBox.confirm('确定删除该题目吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    editorStore.removeCom(index);
    ElMessage.success('删除成功');
  }).catch(() => {
    ElMessage.warning('取消删除');
  });
};
const scrollToBottom = () => {
  nextTick(() => {
    const container = centerContainer.value; // 获取容器的dom元素
    if (container) {
      window.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth',
      });
    }
  });
};
const scrollToCenter = (index: number) => {
  nextTick(() => {
    const component = componentRefs.value[index];
    if (component && component instanceof HTMLElement) {
      component.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
};
// 通过事件总线提供滚动方法给外部调用
EventBus.on('scrollToBottom', scrollToBottom);
EventBus.on('scrollToCenter', scrollToCenter);
</script>
<style scoped>
.center-container {
  width: 50%;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-md);
  margin: 70px auto;
  padding: 20px;
  background: var(--white);
  position: relative;
  .content {
    cursor: pointer;
    padding: 10px;
    background-color: var(--white);
    border-radius: var(--border-radius-sm);
    transition: 0.5s;
    &:hover {
      transform: scale(1.01);
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
  }
}
.active {
  transform: scale(1.01);
  transition: 0.5s;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.delete-btn {
  right: -5px;
  top: -10px;
}
</style>
