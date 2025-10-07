<template>
  <div key="id">
    <div class="mb-10">描述内容</div>
    <el-input
      :rows="5"
      type="textarea"
      placeholder="请输入题目标题"
      v-model="status"
      @update:modelValue="updateStatus(configKey, status)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, inject } from 'vue';
import type { EditActionsInterface, TextConfigKey } from '@/types';
import { EDIT_ACTIONS_KEY } from '@/types';

const props = defineProps<{
  configKey: TextConfigKey;
  status: string;
}>();

const editActions = inject<EditActionsInterface>(EDIT_ACTIONS_KEY);
const status = ref(props.status);

watch(() => props.status, (newStatus) => {
  status.value = newStatus;
});

const updateStatus = (configKey: TextConfigKey, payload: string) => {
  editActions?.updateTextStatus(configKey, payload);
};
</script>

<style scoped></style>
