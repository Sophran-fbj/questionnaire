<template>
  <div class="flex align-items-center space-between">
    <!-- 标题以及当前状态 -->
    <div class="flex align-items-center">
      <div class="mr-20">{{ comTitle }}</div>
      <div class="currentStatus">{{ status }}</div>
    </div>
    <!-- 按钮组 -->
    <div>
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  comTitle: string;
  status: string;
}>();
</script>

<style scoped>
.currentStatus {
  color: var(--info-color);
  font-size: var(--font-size-base);
}
</style>
