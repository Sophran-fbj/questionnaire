<template>
  <ButtonGroup
    :comTitle="`${props.configKey === 'titleColor' ? '标题' : '描述'}颜色`"
    :status="status"
  >
      <el-color-picker v-model="status" @change="updateStatus(props.configKey, status)" />
  </ButtonGroup>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue';
import type { EditActionsInterface } from '@/types/editActions';
import { EDIT_ACTIONS_KEY } from '@/types/editActions';
import ButtonGroup from './ButtonGroup.vue';

const props = defineProps<{
  configKey: string;
  status: string;
}>();

const editActions = inject<EditActionsInterface>(EDIT_ACTIONS_KEY);
const status = ref(props.status);

const updateStatus = (configKey: string, payload: string) => {
  editActions?.updateTextStatus(configKey, payload);
};
</script>

<style scoped lang="scss"></style>
