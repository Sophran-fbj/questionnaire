import Dexie, { type Table } from 'dexie';
import type { SurveyDBData } from '@/types';

class SurveyDataBase extends Dexie {
  surveys!: Table<SurveyDBData, number>;

  constructor() {
    super('SurveyDataBase');
    this.version(1).stores({
      surveys: '++id, createDate, updateDate, title, surveyCount, coms',
    });
  }
}

export const surveyDB = new SurveyDataBase();