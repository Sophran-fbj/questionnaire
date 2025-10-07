<template>
  <div>
    <div class="flex align-items-center mb-10">
      <div class="mr-10">题目选项</div>
      <el-button size="small" :icon="Plus" circle @click="handleAddOption" />
    </div>
    <div v-for="(item, index) in status" :key="index">
      <!-- 选项 -->
      <div class="title mt-10 mb-10 flex align-items-center">
        <span>选项{{ index + 1 }}</span>
        <el-button
          type="danger"
          class="ml-5 delete"
          size="small"
          :icon="Minus"
          circle
          :disabled="status.length <= 2"
          @click="handleRemoveOption(index)"
        />
      </div>

      <!-- 图片上传状态 -->
      <div class="mb-10">
        <div v-if="item.value" class="flex align-items-center">
          <span class="title mr-10">已上传图片</span>
          <el-link type="primary" @click="handleDeleteImage(index)">删除图片</el-link>
        </div>
        <span v-else class="title">未上传图片</span>
      </div>
      <!-- 修改图片标题 -->
      <div class="mb-10">
        <div class="input-label mb-5">图片标题</div>
        <el-input
          :model-value="item.picTitle"
          @input="(value: string) => handleUpdatePicTitle(index, value)"
          placeholder="请输入图片标题"
          maxlength="20"
          show-word-limit
        />
      </div>

      <!-- 修改图片描述 -->
      <div class="mb-15">
        <div class="input-label mb-5">图片描述</div>
        <el-input
          type="textarea"
          :rows="3"
          :model-value="item.picDesc"
          @input="(value: string) => handleUpdatePicDesc(index, value)"
          placeholder="说明（选填，限24字）"
          maxlength="24"
          show-word-limit
        />
      </div>

      <!-- 分割线 -->
      <el-divider v-if="index < status.length - 1" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import { Plus, Minus } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import type { EditActionsInterface, OptionsConfigKey } from '@/types';
import { EDIT_ACTIONS_KEY } from '@/types';
import type { PicTitleDescStatusArr } from '@/types';

const props = defineProps<{
  configKey: OptionsConfigKey;
  status: PicTitleDescStatusArr;
}>();

const editActions = inject<EditActionsInterface>(EDIT_ACTIONS_KEY);

// 处理添加选项
const handleAddOption = () => {
  editActions?.addOption(props.configKey);
  ElMessage.success('选项添加成功');
};

// 处理删除选项
const handleRemoveOption = (index: number) => {
  const result = editActions?.removeOption(props.configKey, index);
  if (result?.success) {
    ElMessage.success(result.message);
  } else {
    ElMessage.warning(result?.message || '删除失败');
  }
};

// 处理更新图片标题
const handleUpdatePicTitle = (index: number, value: string) => {
  editActions?.updatePicTitle(props.configKey, index, value);
};

// 处理更新图片描述
const handleUpdatePicDesc = (index: number, value: string) => {
  editActions?.updatePicDesc(props.configKey, index, value);
};

// 处理删除图片
const handleDeleteImage = (index: number) => {
  editActions?.deletePicImage(props.configKey, index);
  ElMessage.success('图片删除成功');
};
</script>

<style scoped lang="scss">
.title {
  color: var(--font-color-light);
  font-size: var(--font-size-base);
}
.delete {
  transform: scale(0.8);
}
</style>
