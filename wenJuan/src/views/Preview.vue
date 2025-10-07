<template>
  <div class="preview-container pb-40">
    <div class="center mc">
      <!-- 上面的按钮组 -->
      <div class="button-group flex space-between align-items-center">
        <!-- 左边按钮 -->
        <div class="flex space-between no-print">
          <el-button type="danger" @click="gobackHandle">返回</el-button>
          <el-button type="success" @click="genQuiz">生成在线问卷</el-button>
          <el-button type="warning" @click="genPDF">生成本地PDF</el-button>
        </div>
        <!-- 题目数量 -->
        <div class="mr-15">
          <el-text class="mx-1">题目数量：{{ store.surveyCount }}</el-text>
        </div>
      </div>
      <!-- 对应的问卷 -->
      <div class="content-group no-border">
        <div class="content mb-10" v-for="(com, index) in store.coms" :key="index">
          <component :is="com.type" :status="com.status" :serialNum="serialNum[index]" />
        </div>
      </div>
    </div>
  </div>
  <el-dialog v-model="dialogVisible" title="在线问卷" width="500">
    分享链接：
    <a :href="quizLink" target="_blank">{{ quizLink }}</a>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="copyLink">复制链接</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { restoreComponentStatus } from '@/utils';
import { getSerialNumber } from '@/utils/hooks';
import { useEditorStore } from '@/stores/useEditor';
import { ElMessage } from 'element-plus';
import { isPDFCom } from '@/types';
import { v4 as uuidv4 } from 'uuid';

const dialogVisible = ref(false);
const quizLink = ref('');

const store = useEditorStore();
const route = useRoute();
const router = useRouter();
const serialNum = computed(() => getSerialNumber(store.coms));
const id = Number(route.params.id);
if (id) {
  store
    .getComsById(id)
    .then((res) => {
      if (res) {
        // 找到了对应的问卷数据
        restoreComponentStatus(res.coms);
        store.setComs(res);
      } else {
        // 没有找到对应的问卷
        ElMessage.error('问卷不存在');
        router.push('/');
      }
    })
    .catch((error) => {
      console.error('获取问卷失败:', error);
      ElMessage.error('获取问卷失败');
      router.push('/');
    });
} else {
  ElMessage.error('无效的问卷 ID');
  router.push('/');
}
const gobackHandle = () => {
  const path = history.state.from;
  if (path === 'home') {
    router.back();
  } else {
    router.push(`/editor/${id}/survey-type`);
  }
};

// 生成PDF
const genPDF = () => {
  const checkResult = store.coms.every((item) => isPDFCom(item.name));
  if (!checkResult) {
    ElMessage.warning('存在不支持PDF导出的组件，请先移除这些组件');
    return;
  }
  // 生成PDF之前需要检查
  window.print();
};

// 生成在线问卷
const genQuiz = async () => {
  // 1. 首先将问卷的数据传递到服务器端，服务器端存储到内存中
  const id = uuidv4();
  // 将问卷内容和id传递给服务器
  try {
    await fetch('/api/saveQuiz', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        quizData: {
          coms: JSON.stringify(store.coms),
          surveyCount: store.surveyCount,
        },
      }),
    });
    // 2. 等保存成功后再显示弹出框
    quizLink.value = `${window.location.origin}/quiz/${id}`;
    dialogVisible.value = true;
  } catch (error) {
    console.error('保存问卷失败:', error);
    ElMessage.error('生成在线问卷失败');
  }
};

const copyLink = () => {
  dialogVisible.value = false;
  navigator.clipboard.writeText(quizLink.value);
  ElMessage.success('链接已复制');
};
</script>

<style scoped lang="scss">
.preview-container {
  width: 100%;
  min-height: 100vh;
  background: url('@/assets/imgs/editor_background.png');
}
.center {
  width: 800px;
}
.button-group {
  width: 100%;
  height: 60px;
  top: 0;
  left: 0;
  background-color: var(--white);
  z-index: 100;
}
.content-group {
  padding: 20px;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  background: var(--white);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}
@media print {
  .no-print {
    display: none;
  }
  .no-border {
    border: none;
    box-shadow: none;
  }
}
</style>
