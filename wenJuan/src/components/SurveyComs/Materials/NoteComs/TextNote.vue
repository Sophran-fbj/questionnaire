<template>
  <h1
    v-if="computedStatus.type === 0"
    class="pt-10 pb-10 text-center font-weight-200"
    :class="{
      'font-italic': !computedStatus.titleItalic,
      'font-bold': !computedStatus.titleWeight,
    }"
    :style="{
      fontSize: computedStatus.titleSize + 'px',
      color: computedStatus.titleColor,
    }"
  >
    {{ computedStatus.title }}
  </h1>
  <p
    v-else
    :class="{
      'text-center': computedStatus.position,
      'font-italic': !computedStatus.descItalic,
      'font-bold': !computedStatus.descWeight,
    }"
    :style="{
      fontSize: computedStatus.descSize + 'px',
      color: computedStatus.descColor,
    }"
  >
    {{ computedStatus.desc }}
  </p>
</template>

<script setup lang="ts">
import { getTextStatus, getCurrentStatus, getStringStatusByCurrentIndex } from '@/utils';
import type { TextNoteStatus } from '@/types';
import { computed } from 'vue';

const props = defineProps<{
  status: TextNoteStatus;
}>();

const computedStatus = computed(() => ({
  type: getCurrentStatus(props.status.type),
  title: getTextStatus(props.status.title),
  desc: getTextStatus(props.status.desc),
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

<style scoped>

</style>