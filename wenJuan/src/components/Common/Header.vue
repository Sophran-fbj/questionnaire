<template>
  <div class="header-container flex self-start align-items-center border-box">
    <div class="left flex justify-content-center align-items-center">
      <el-button :icon="ArrowLeft" circle size="small" @click="goHome" />
    </div>
    <div class="center flex align-items-center space-between pl-15 pr-15">
      <div v-if="isEditor">
        <el-button type="danger" size="small" @click="reset">重置问卷</el-button>
        <el-button type="success" size="small" @click="saveSurvey">保存问卷</el-button>
      </div>
    </div>
    <div class="right flex justify-content-center align-items-center">
      <el-avatar
        :size="30"
        src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useEditorStore } from '@/stores/useEditor';
const store = useEditorStore();

defineProps({
  isEditor: {
    type: Boolean,
    default: false,
  },
});

const router = useRouter();
const goHome = () => {
  localStorage.setItem('activeView', 'home');
  router.push('/');
};

const reset = () => {
  ElMessageBox.confirm('确定要重置问卷吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      store.resetComs();
      ElMessage.success('重置成功');
    })
    .catch(() => {
      ElMessage.info('已取消重置');
    });
};

const saveSurvey = () => {
  ElMessageBox.prompt('请输入问卷的标题', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'info',
  })
    .then(({ value }) => {
      const surveyToSave = {
        createDate: new Date().getTime(),
        title: value,
        updateDate: new Date().getTime(),
        surveyCount: store.surveyCount,
        coms: JSON.parse(JSON.stringify(store.coms)),
      };
      store
        .saveComs(surveyToSave)
        .then(() => {
          ElMessage.success('问卷已保存');
        })
        .catch(() => {
          ElMessage.error('问卷保存失败');
        });
    })
    .catch(() => {
      ElMessage.info('已取消保存');
    });
};
</script>

<style scoped lang="scss">
.header-container {
  width: 100%;
  height: 50px;
  border-bottom: 1px solid var(--border-color);
  .left {
    width: 60px;
    height: 100%;
  }
  .center {
    flex: 1;
    height: 100%;
    border-left: 1px solid var(--border-color);
    border-right: 1px solid var(--border-color);
  }
  .right {
    width: 80px;
    height: 100%;
  }
}
</style>
