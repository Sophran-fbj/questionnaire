<template>
  <div class="pt-20 pb-20 pl-20 pr-20">
    <h1 class="font-weight-400 text-center">问卷系统</h1>
    <!-- 按钮组 -->
    <div class="mb-15">
      <el-button type="primary" :icon="Plus" @click="goToEditor">创建问卷</el-button>
      <el-button type="success" :icon="Compass" @click="goToComMarket">组件市场</el-button>
    </div>
    <!-- 数据表格 -->
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column
        fixed
        prop="createDate"
        label="创建日期"
        width="150"
        align="center"
        :formatter="formatDate"
      />
      <el-table-column prop="title" label="问卷标题" />
      <el-table-column prop="surveyCount" label="题目数" width="150" align="center" />
      <el-table-column
        prop="updateDate"
        label="最近更新日期"
        width="150"
        align="center"
        :formatter="formatDate"
      />
      <el-table-column fixed="right" label="操作" width="300" align="center">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="goToPreview(scope.row.id)"
            >查看问卷</el-button
          >
          <el-button link type="primary" size="small" @click="goToEditor(scope.row.id)"
            >编辑</el-button
          >
          <el-button link type="primary" size="small" @click="deleteSurvey(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { Plus, Compass } from '@element-plus/icons-vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getAllSurvey, deleteSurveyById } from '@/database/operation';
import type { SurveyDBData } from '@/types';
import { formatDate } from '@/utils';
import { ElMessageBox } from 'element-plus';

const router = useRouter();

const tableData = ref<SurveyDBData[]>([]);
const getData = () => {
  getAllSurvey().then((res) => {
    tableData.value = res;
  });
};
getData();
const deleteSurvey = (id: number) => {
  ElMessageBox.confirm('确定要删除问卷吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    deleteSurveyById(id).then(() => {
      getData();
    });
  });
};
const goToEditor = (id: number) => {
  localStorage.setItem('activeView', 'editor');
  const path = typeof id === 'number' ? `/editor/${id}/survey-type` : '/editor/survey-type';
  console.log(path);
  router.push({ path, state: { from: 'home' } });
};
const goToComMarket = () => {
  localStorage.setItem('activeView', 'materials');
  router.push('/materials');
};
const goToPreview = (id: number) => {
  router.push({ path: `/preview/${id}`, state: { from: 'home' } });
};
</script>

<style lang="scss" scoped></style>
