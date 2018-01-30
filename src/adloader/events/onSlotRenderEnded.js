import { createLogger } from '../log';

import { getAdById } from '../ads';
import { dispatch } from './index';

export default event => {
  const id = event.slot.getSlotElementId();
  const log = createLogger(`adloader:ad:${id}`);
  log('Slot render ended');

  const ad = getAdById(id);
  log(ad);
  if (ad) {
    log('Determine type and size');
    log(event);
    ad.isEmpty = event.isEmpty;
    if (ad.isEmpty) {
      log('Ad is empty');
    } else {
      ad.isNativeAd = isNativeAd(id);
      ad.isBannerAd = !ad.isNativeAd;
      [ad.width, ad.height] = event.size;
      log(`Size ${ad.width}x${ad.height}`);
    }

    dispatch('adRender', ad);
  } else {
    log(`Could not find ad for ID ${id}`);
  }
};

function isNativeAd(id) {
  return id.indexOf('ad_native_') !== -1;
}
