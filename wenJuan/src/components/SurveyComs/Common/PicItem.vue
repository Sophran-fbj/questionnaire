<template>
  <div @click.stop>
    <div class="container mb-10">
      <!-- 添加图片 -->
      <div class="top flex justify-content-center align-items-center">
        <el-upload
          class="avatar-uploader"
          action="/api/upload"
          name="image"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <div v-else>
            <el-icon><Upload /></el-icon>
            添加图片
          </div>
        </el-upload>
      </div>
      <!-- 图片标题和描述 -->
      <div
        class="bottom flex justify-content-center align-items-center flex-direction-column font-weight-500"
      >
        <div class="item">{{ picTitle }}</div>
        <div class="desc mt-5 mb-5">{{ picDesc }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, inject } from 'vue';
import { Upload } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import type { EditActionsInterface } from '@/types/editActions';
import { EDIT_ACTIONS_KEY, createEmptyEditActions } from '@/types/editActions';
import type { UploadProps } from 'element-plus';

const props = defineProps<{
  picTitle: string;
  picDesc: string;
  value: string;
  index: number;
}>();

const editActions = inject<EditActionsInterface>(EDIT_ACTIONS_KEY, createEmptyEditActions());
const imageUrl = ref(props.value);

watch(() => props.value, (newVal) => {
  imageUrl.value = newVal;
});

const handleAvatarSuccess = async (response: any) => {
  console.log('上传响应:', response); // 🔥 添加这行调试
  console.log('图片URL:', response.imageUrl); // 🔥 添加这行调试
  editActions?.updatePicStatus('options', props.index, response.imageUrl);
};

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('图片大小不要超过2MB!');
    return false;
  }
  return true;
};
</script>

<style scoped lang="scss">
.container {
  width: 200px;
  height: 300px;
  border: 1px solid var(--font-color-lightest);
  border-radius: var(--border-radius-md);
  color: var(--font-color-light);
  > .top {
    width: 100%;
    height: 200px;
    background-color: var(--font-color-lightest);
  }
  > .bottom {
    height: 100px;
    font-size: var(--font-size-lg);
    > .desc {
      font-size: var(--font-size-base);
      color: var(--font-color-light);
    }
  }
}
.avatar {
  width: 200px;
  height: 200px;
  object-fit: contain;
}
</style>
