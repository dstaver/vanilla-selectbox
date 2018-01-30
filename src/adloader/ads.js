/** @module ads */

import { createLogger } from './log';
import { Ad } from './Ad';

export const ads = [];

export function getAds() {
  return ads;
}

/**
 * Find an ad by its ID
 * @param {string} id
 * @returns {Ad}
 */
export function getAdById(id) {
  const log = createLogger(`adloader:ad:${id}`);
  const ad = ads.find(item => item.id === id);
  if (ad) {
    log('Ad was found by its ID');
    return ad;
  }
  log('Ad was not found by its ID');
  return false;
}

/**
 * Configure many ads at once
 * @param {array} ads Array of ads to configure
 */
export function createAds(newAds) {
  const log = createLogger('adloader:ads:createAds');
  log(`Creating ${newAds.length} ads`);
  const result = newAds.map(adConfig => {
    log(`Creating ad with ID ${adConfig.id}`);
    const ad = new Ad(adConfig);
    ads.push(ad);
    return ad;
  });
  log('Done');
  return result;
}
