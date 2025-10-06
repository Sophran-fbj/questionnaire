<template>
  <div>
    <div class="container mb-15">
      <!-- 标题 -->
      <h2
        class="title font-weight-100"
        :style="{
          'font-size': titleSize + 'px',
          color: titleColor,
        }"
        :class="{
          'font-bold': !titleWeight,
          'font-italic': !titleItalic,
        }"
      >
        <span class="mr10">{{ serialNum }}.</span>{{ title }}
      </h2>
      <!-- 描述 -->
      <div
        class="desc"
        :style="{
          'font-size': descSize,
          color: descColor,
        }"
        :class="{
          'font-bold': !descWeight,
          'font-italic': !descItalic,
        }"
      >
        {{ desc }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  serialNum: Number,
  title: String,
  desc: String,
  titleSize: String,
  descSize: String,
  titleWeight: Number,
  descWeight: Number,
  titleItalic: Number,
  descItalic: Number,
  titleColor: String,
  descColor: String,
});
</script>

<style scoped lang="scss">
.container {
  > h2 {
    font-size: 20px;
    > span {
      margin: 0 5px;
    }
  }
}
.desc {
  font-size: var(--font-size-base);
  color: var(--font-color-light);
  text-indent: 5px;
}
</style>
