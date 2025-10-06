import { isSurveyComName } from '@/types';
import type { MaterialComStatus } from '@/types';

export function getSerialNumber(coms: MaterialComStatus[]) {
  let serialNumber = 1;
  return coms.map((com) => {
    if (isSurveyComName(com.name)) {
      return serialNumber++;
    }
    return null;
  });
} 
