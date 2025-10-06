<template>
  <div class="editor-panel-container">
    <div v-for="(item, key) in com.status" :key="key" class="mb-20">
      <component v-if="item.isShow" :is="item.editCom" :config-key="key" v-bind="item"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MaterialComStatus } from '@/types';
defineProps<{
  com: MaterialComStatus;
}>();
</script>

<style scoped>
.editor-panel-container {
  padding: 30px;
  background-color: var(--bg-color);
}
</style>