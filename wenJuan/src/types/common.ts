import type { defineComponent } from 'vue';
import type { OptionsStatus, TextNoteStatus } from './editProps';

export type VueComType = ReturnType<typeof defineComponent>;
export type MaterialComStatus = {
  type: VueComType,
  name: string,
  id: string,
  status: OptionsStatus | TextNoteStatus,
} 