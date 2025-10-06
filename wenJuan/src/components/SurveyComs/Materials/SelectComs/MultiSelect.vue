<template>
  <div :class='{
    "text-center": computedStatu.position
  }'>
    <MaterialsHeader
      :serialNum="serialNum"
      :title="computedStatu.title"
      :desc="computedStatu.desc"
      :titleSize="computedStatu.titleSize"
      :descSize="computedStatu.descSize"
      :titleWeight="computedStatu.titleWeight"
      :descWeight="computedStatu.descWeight"
      :titleItalic="computedStatu.titleItalic"
      :descItalic="computedStatu.descItalic"
      :titleColor="computedStatu.titleColor"
      :descColor="computedStatu.descColor"
    />
    <el-radio-group>
      <el-radio v-for="(option, index) in computedStatu.options" :value="option" :key="index">{{
        option
      }}</el-radio>
    </el-radio-group>
  </div>
</template>

<script setup lang="ts">
import MaterialsHeader from '@/components/SurveyComs/Common/MaterialsHeader.vue';
import { getTextStatus, getStringStatus, getCurrentStatus, getStringStatusByCurrentIndex } from '@/utils';
import type { OptionsStatus } from '@/types';
import { computed } from 'vue';

const props = defineProps<{
  serialNum: number;
  status: OptionsStatus;
}>();

const computedStatu = computed(() => ({
  title: getTextStatus(props.status.title),
  desc: getTextStatus(props.status.desc),
  options: getStringStatus(props.status.options),
  position: getCurrentStatus(props.status.position),
  titleSize: getStringStatusByCurrentIndex(props.status.titleSize),
  descSize: getStringStatusByCurrentIndex(props.status.descSize),
  titleWeight: getCurrentStatus(props.status.titleWeight),
  descWeight: getCurrentStatus(props.status.descWeight),
  titleItalic: getCurrentStatus(props.status.titleItalic),
  descItalic: getCurrentStatus(props.status.descItalic),
  titleColor: getTextStatus(props.status.titleColor),
  descColor: getTextStatus(props.status.descColor),
}));
</script>

<style scoped></style>
