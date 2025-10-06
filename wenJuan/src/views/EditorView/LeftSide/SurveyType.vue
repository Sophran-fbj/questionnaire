<template>
  <div class="survey-type-container">
    <ServerComGroup v-for="(group, index) in SurveyComsList" :key="index" v-bind="group" />
  </div>
</template>

<script setup lang="ts">
import ServerComGroup from '@/components/Editor/ServerComGroup.vue';
import { SurveyComsList } from '@/configs/SurveyGroupConfig';
</script>

<style scoped lang="scss">
.survey-type-container {
  height: calc(100vh - 50px - 40px);
  overflow: hidden;
}
</style>
