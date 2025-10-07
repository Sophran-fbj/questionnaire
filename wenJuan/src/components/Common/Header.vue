<template>
  <div class="header-container flex self-start align-items-center border-box">
    <div class="left flex justify-content-center align-items-center">
      <el-button :icon="ArrowLeft" circle size="small" @click="goHome" />
    </div>
    <div class="center flex align-items-center space-between pl-15 pr-15">
      <div v-if="isEditor">
        <div v-if="id">
          <el-button type="warning" size="small" @click="updateSurvey">更新问卷</el-button>
        </div>
        <div v-else>
          <el-button type="danger" size="small" @click="reset">重置问卷</el-button>
          <el-button type="success" size="small" @click="saveSurveyForButton">保存问卷</el-button>
        </div>
      </div>
      <div v-if="isEditor">
        <el-button type="primary" size="small" @click="gotoPreview">预览</el-button>
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

const props = defineProps({
  isEditor: {
    type: Boolean,
    default: false,
  },
  id: {
    type: String,
    default: '',
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

// 保存问卷的核心逻辑（返回 Promise 和问卷 ID）
const saveSurvey = async (): Promise<number> => {
  try {
    // 等待用户输入标题
    const { value } = await ElMessageBox.prompt('请输入问卷的标题', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'info',
    });

    // 构造要保存的问卷数据
    const surveyToSave = {
      createDate: new Date().getTime(),
      title: value,
      updateDate: new Date().getTime(),
      surveyCount: store.surveyCount,
      coms: JSON.parse(JSON.stringify(store.coms)),
    };

    // 保存到数据库，返回 ID
    const id = await store.saveComs(surveyToSave);
    ElMessage.success('问卷已保存');
    return id; // 返回保存后的问卷 ID
  } catch (error) {
    ElMessage.info('已取消保存');
    throw error; // 抛出错误，让调用者知道保存失败
  }
};

// 供按钮点击使用的保存函数（不需要返回值）
const saveSurveyForButton = async () => {
  try {
    await saveSurvey();
  } catch (error) {
    // 用户取消了保存，不需要额外处理
  }
};

const gotoPreview = async () => {
  try {
    // 等待用户确认是否跳转预览
    await ElMessageBox.confirm('预览会自动保存问卷，是否跳转预览？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'info',
    });

    let previewId: number;

    if (props.id) {
      // 如果有 ID，说明是编辑已有问卷，执行更新
      await store.updateComs(Number(props.id), {
        updateDate: new Date().getTime(),
        surveyCount: store.surveyCount,
        coms: JSON.parse(JSON.stringify(store.coms)),
      });
      previewId = Number(props.id);
    } else {
      // 如果没有 ID，说明是新问卷，需要保存并获取 ID
      previewId = await saveSurvey();
    }

    // 跳转到预览页面
    router.push({
      path: `/preview/${previewId}`,
      state: { from: 'editor' },
    });
  } catch (error) {
    // 用户取消了操作（点击了取消或关闭），不做任何处理
    console.log('用户取消了预览操作');
  }
};

const updateSurvey = () => {
  ElMessageBox.confirm('是否确定更新问卷', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      store
        .updateComs(Number(props.id), {
          updateDate: new Date().getTime(),
          surveyCount: store.surveyCount,
          coms: JSON.parse(JSON.stringify(store.coms)),
        })
        .then(() => {
          ElMessage.success('问卷已更新');
        });
    })
    .catch(() => {
      ElMessage.info('已取消更新');
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
