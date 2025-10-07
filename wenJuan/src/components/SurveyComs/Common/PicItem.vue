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
          :disabled="isPreviewMode"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <div v-else>
            <el-icon><Upload /></el-icon>
            {{ isPreviewMode ? '预览模式' : '添加图片' }}
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
import { inject, computed } from 'vue';
import { Upload } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import type { EditActionsInterface } from '@/types/editActions';
import { EDIT_ACTIONS_KEY, createEmptyEditActions } from '@/types/editActions';
import type { UploadProps } from 'element-plus';
import { useEditorStore } from '@/stores/useEditor';

const props = defineProps<{
  picTitle: string;
  picDesc: string;
  value: string;
  index: number;
}>();

const editActions = inject<EditActionsInterface>(EDIT_ACTIONS_KEY, createEmptyEditActions());
// 🔥 注入组件索引（由 Center.vue 提供）
const componentIndex = inject<number>('componentIndex', -1);
// 🔥 判断是否为预览模式
const isPreviewMode = computed(() => componentIndex === -1);

const editorStore = useEditorStore();
const imageUrl = computed(() => props.value);

const handleAvatarSuccess = async (response: any) => {
  // 🔥 上传前先选中当前组件
  if (componentIndex >= 0 && editorStore.currentComponentIndex !== componentIndex) {
    editorStore.setCurrentComponentIndex(componentIndex);
  }
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
