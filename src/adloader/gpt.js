/**
 * @module gpt
 */
import onImpressionViewable from './events/onImpressionViewable';
import onSlotLoad from './events/onSlotLoad';
import onSlotRenderEnded from './events/onSlotRenderEnded';
import { loadScriptAsync } from './loadScript';
import { setReadyCondition } from './ready';
import { isString, isNotEmptyArray } from './validators';

const debug = require('debug');

window.googletag = window.googletag || {};
window.googletag.cmd = window.googletag.cmd || [];

export async function display(id) {
  const log = debug(`adloader:ad:${id}`);
  const { googletag } = window;
  googletag.cmd.push(() => {
    googletag.display(id);
    log('Display');
    Promise.resolve();
  });
}

export async function refresh(slots) {
  const log = debug(`adloader:gpt:refresh`);
  const { googletag } = window;
  if (isNotEmptyArray(slots)) {
    googletag.cmd.push(() => {
      log(`Refresh ${slots.length} slots`);
      googletag.pubads().refresh(slots, {
        changeCorrelator: false,
      });
      Promise.resolve();
    });
  } else {
    log('No slots to refresh');
    Promise.reject();
  }
}

/**
 * Initial GPT configuration
 * @export
 * @param {boolean} loadGptScript If true it will load the gpt.js script asynchronously
 */
export function configure() {
  return new Promise(resolve => {
    const log = debug('adloader:gpt:configure');
    const { googletag } = window;
    log('Start');
    googletag.cmd.push(() => {
      // googletag.pubads().collapseEmptyDivs(false);
      googletag.pubads().setCentering(true);
      googletag.pubads().enableSingleRequest();
      googletag.pubads().disableInitialLoad();
      log('Done');
      resolve();
    });
  });
}

export function loadGptScript() {
  const log = debug('adloader:gpt:loadGptScript');
  log('Load gpt.js');
  return loadScriptAsync(
    'https://www.googletagservices.com/tag/js/gpt.js',
    () => log('gpt.js loaded')
  );
}

export function defineSlot(ad) {
  return new Promise((resolve, reject) => {
    const { googletag } = window;
    googletag.cmd.push(() => {
      ad.log('Define slot');
      ad.log(ad.adUnit, ad.size, ad.id);
      const slot = googletag
        .defineSlot(ad.adUnit, ad.size, ad.id)
        .addService(googletag.pubads());
      if (slot) {
        resolve(slot);
      } else {
        reject(new Error(`Slot configuration failed for ad ${ad.id}`));
      }
    });
  });
}

export function enable() {
  return new Promise(resolve => {
    const log = debug('adloader:gpt:enable');
    const { googletag } = window;
    log('Start');
    googletag.cmd.push(() => {
      googletag.enableServices();
      setReadyCondition('gptEnabled', true);
      log('Done');
      resolve();
    });
  });
}

export function addEventListeners() {
  return new Promise(resolve => {
    const log = debug('adloader:gpt:addEventListeners');
    const { googletag } = window;
    log('Start');
    googletag.cmd.push(() => {
      googletag.pubads().addEventListener('slotOnload', onSlotLoad);
      googletag.pubads().addEventListener('slotRenderEnded', onSlotRenderEnded);
      googletag
        .pubads()
        .addEventListener('impressionViewable', onImpressionViewable);
      log('Done');
      resolve();
    });
  });
}

/**
 * Set adloader targeting
 *
 * @export
 * @param {any} targeting
 */
export function setTargeting(targeting) {
  return new Promise(resolve => {
    const log = debug('adloader:gpt:setTargeting');
    const { googletag } = window;
    googletag.cmd.push(() => {
      targeting.forEach(([key, value]) => {
        log('Set targeting', key, 'to', value);
        googletag.pubads().setTargeting(key, value);
      });
      log('Done');
      resolve();
    });
  });
}

export async function setAdTargeting(ad) {
  ad.log('Set targeting', ad.targeting);
  if (ad.targeting && ad.slot) {
    const { googletag } = window;
    googletag.cmd.push(() => {
      ad.targeting.forEach(([key, value]) => {
        if (value && (isString(value) || isNotEmptyArray(value))) {
          ad.log(`Set targeting ${key} to ${value}`);
          ad.slot.setTargeting(key, value);
        }
      });
      ad.log('Targeting done');
      Promise.resolve();
    });
  }
}
