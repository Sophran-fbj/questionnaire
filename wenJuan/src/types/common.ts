import type { defineComponent } from 'vue';
import type { OptionsStatus, TextNoteStatus } from './editProps';
import type { Material, SurveyComName } from './material';

export type VueComType = ReturnType<typeof defineComponent>;

// 判别联合类型：根据 name 自动推断 status 类型
export type MaterialComStatus =
  | {
      type: VueComType;
      name: 'text-note';
      id: string;
      status: TextNoteStatus;
    }
  | {
      type: VueComType;
      name: SurveyComName;
      id: string;
      status: OptionsStatus;
    };

// TextNote 组件类型别名（简化使用）
export type tn = {
  type: VueComType;
  name: 'text-note';
  id: string;
  status: TextNoteStatus;
};

// 物料组件映射类型（用于 Store）
export type MaterialComMap = {
  [K in Material]: MaterialComStatus;
};
