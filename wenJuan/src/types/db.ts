import type { MaterialComStatus } from './common';

export interface SurveyDBData {
  createDate: number;
  updateDate: number;
  title: string;
  surveyCount: number;
  coms: MaterialComStatus[];
}