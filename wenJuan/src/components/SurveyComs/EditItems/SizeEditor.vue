<template>
  <ButtonGroup
    :comTitle="`${props.configKey === 'titleSize' ? '标题' : '描述'}尺寸`"
    :status="status[currentIndex]"
  >
    <el-button-group>
      <el-button
        :class="{
          select: currentIndex === 0,
        }"
        @click="changePosition(0)"
      >
      <font-awesome-icon icon="font" size="lg" />
      </el-button>
      <el-button
        :class="{
          select: currentIndex === 1,
        }"
        @click="changePosition(1)"
      >
      <font-awesome-icon icon="font" size="sm" />
      </el-button>
      <el-button
        :class="{
          select: currentIndex === 2,
        }"
        @click="changePosition(2)"
      >
      <font-awesome-icon icon="font" size="xs" />
      </el-button>
    </el-button-group>
  </ButtonGroup>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import type { EditActionsInterface } from '@/types/editActions';
import { EDIT_ACTIONS_KEY } from '@/types/editActions';
import ButtonGroup from './ButtonGroup.vue';

const props = defineProps<{
  configKey: string;
  status: string[];
  currentIndex: number;
}>();

const editActions = inject<EditActionsInterface>(EDIT_ACTIONS_KEY);

const changePosition = (index: number) => {
  editActions?.updateCurrentIndex(props.configKey, index);
};
</script>

<style scoped lang="scss"></style>
