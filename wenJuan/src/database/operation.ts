// 该文件提供具体的数据库操作方法的支持

import { surveyDB } from './db';
import type { SurveyDBData } from '@/types';

// 保存数据
export async function saveSurvey(data: SurveyDBData) {
  return await surveyDB.surveys.add(data);
}

// 查询所有数据
export async function getAllSurvey() {
  return await surveyDB.surveys.toArray();
}

// 根据 id 查询某一条数据
export async function getSurveyById(id: number) {
  return await surveyDB.surveys.get(id);
}

// 根据 id 删除某一条数据
export async function deleteSurveyById(id: number) {
  return await surveyDB.surveys.delete(id);
}

// 根据 id 更新某一条数据
export async function updateSurveyById(id: number, data: Partial<SurveyDBData>) {
  return await surveyDB.surveys.update(id, data);
}
