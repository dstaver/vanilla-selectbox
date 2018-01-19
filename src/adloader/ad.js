import { state } from './state';
import { elementReadyById } from './elementReady';

const debug = require('debug');

export function createAds(ads) {
  const log = debug('adloader.createAds');
  log(`Creating ${ads.length} ads`);
  if (Array.isArray(ads) && ads.length) {
    ads.forEach(createAd);
  }
  log('Done');
}

export function createAd({ id, size, targeting }) {
  const log = debug(`adloader:ad:${id}`);
  log('Create');
  const ad = {
    id,
    size,
    targeting,
    element: document.getElementById(id),
  };
  if (!ad.element) {
    log('DOM element not found, waiting for it to appear');
    elementReadyById(id, el => {
      log('DOM element found');
      ad.element = el;
    });
  }
  state.ads.push(ad);
}
