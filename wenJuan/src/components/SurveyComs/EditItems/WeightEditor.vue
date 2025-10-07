<template>
  <ButtonGroup
    :comTitle="`${props.configKey === 'titleWeight' ? '标题' : '描述'}粗细`"
    :status="status[currentIndex]"
  >
    <el-button-group>
      <el-button :class="{ select: currentIndex === 0 }" @click="changePosition(0)">
        <font-awesome-icon icon="bold" size="lg" />
      </el-button>
      <el-button :class="{ select: currentIndex === 1 }" @click="changePosition(1)">
        <font-awesome-icon icon="bold" size="sm" />
      </el-button>
    </el-button-group>
  </ButtonGroup>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import type { EditActionsInterface, OptionsConfigKey } from '@/types';
import { EDIT_ACTIONS_KEY } from '@/types';
import ButtonGroup from './ButtonGroup.vue';

const props = defineProps<{
  configKey: OptionsConfigKey;
  status: string[];
  currentIndex: number;
}>();

const editActions = inject<EditActionsInterface>(EDIT_ACTIONS_KEY);
const changePosition = (index: number) => {
  editActions?.updateCurrentIndex(props.configKey, index);
};
</script>

<style scoped></style>
