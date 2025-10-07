<template>
  <div :key="configKey">
    <div class="mb-10">标题内容</div>
    <el-input type="text" v-model="status" @input="updateStatus(configKey, status)" />
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
