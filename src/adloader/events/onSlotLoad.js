import { getAdById } from '../ads';
import { dispatch } from './index';

export default e => {
  const id = e.slot.getSlotElementId();
  const ad = getAdById(id);

  if (ad) {
    ad.log('onSlotLoad event');

    dispatch('adLoad', ad);
  }
};
