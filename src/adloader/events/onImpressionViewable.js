import { getAdById } from '../ad';
import dispatch from '../dispatch';

export default e => {
  const id = e.slot.getSlotElementId();
  const ad = getAdById(id);

  if (ad) {
    dispatch('adViewable', ad);
  }
};
