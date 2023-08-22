import {
  database, ref, remove,
} from '../../config/firebase';
import checkUID from '../../utils/checkUID';
import { globalActionType } from '../GlobalContext';

export const deleteRecord = (isDemo, id) => {
  if (!isDemo) {
    const uid = JSON.parse(checkUID());
    remove(ref(database, `users/${uid}/records/${id}`));
  }
  return {
    type: globalActionType.DELETE_RECORD,
    id,
  };
};
