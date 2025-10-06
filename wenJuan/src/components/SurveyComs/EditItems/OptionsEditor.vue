<template>
  <div :key="configKey">
    <div class="flex align-items-center mb-10">
      <div class="mr-10">选项</div>
      <el-button 
        size="small" 
        circle 
        :icon="Plus" 
        @click="handleAddOption"
      />
    </div>
    <div v-for="(item, index) in status" :key="index" class="flex align-items-center">
      <el-input 
        placeholder="选项" 
        class="mt-5 mb-5" 
        v-model="status[index]"
        @input="(value: string) => handleUpdateOption(index, value)"
      />
      <el-button
        type="danger"
        class="ml-10"
        size="small"
        :icon="Minus"
        circle
        @click="handleRemoveOption(index)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import { Plus, Minus } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import type { EditActionsInterface } from '@/types/editActions';
import { EDIT_ACTIONS_KEY } from '@/types/editActions';

const props = defineProps<{
  configKey: string;
  status: string[];
}>();

const editActions = inject<EditActionsInterface>(EDIT_ACTIONS_KEY);

const handleAddOption = () => {
  editActions?.addOption(props.configKey);
  ElMessage.success('选项添加成功');
};

const handleRemoveOption = (index: number) => {
  const result = editActions?.removeOption(props.configKey, index);
  if (result?.success) {
    ElMessage.success(result.message);
  } else {
    ElMessage.warning(result?.message || '删除失败');
  }
};

const handleUpdateOption = (index: number, value: string) => {
  editActions?.updateSingleOption(props.configKey, index, value);
};
</script>

<style scoped></style>
