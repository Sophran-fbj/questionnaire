import type { MaterialComStatus } from './common';

export interface SurveyDBData {
  createDate: number;
  updateDate: number;
  title: string;
  surveyCount: number;
  coms: MaterialComStatus[];
}

export type QuizData = {
  surveyCount: number;
  coms: MaterialComStatus[];
};