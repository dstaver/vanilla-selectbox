/** @module gpt */
import { createLogger } from './log';

import { loadScriptAsync } from './script';
import { setReadyCondition } from './ready';
import onImpressionViewable from './events/onImpressionViewable';
import onSlotLoad from './events/onSlotLoad';
import onSlotRenderEnded from './events/onSlotRenderEnded';

window.googletag = window.googletag || {};
window.googletag.cmd = window.googletag.cmd || [];

const log = createLogger('adloader:gpt');

/**
 * Display ad by ID
 *
 * @param {any} id
 */
export function display(id) {
  return new Promise((resolve, reject) => {
    const { googletag } = window;
    googletag.cmd.push(() => {
      const el = document.getElementById(id);
      if (el) {
        log(`display() element with ID ${id}`);
        googletag.display(id);
        resolve(id);
      } else {
        const err = new Error(`display() could not find element with ID ${id}`);
        reject(err);
      }
    });
  });
}

/**
 * Refresh slot
 *
 * @param {any} slots
 */
export function refresh(...slots) {
  return new Promise((resolve, reject) => {
    const { googletag } = window;
    if (slots.length) {
      log('refresh() start');
      googletag.cmd.push(() => {
        googletag.pubads().refresh(slots, {
          changeCorrelator: false,
        });
        log('refresh() done');
        resolve();
      });
    } else {
      const err = new Error('No slots to refresh');
      reject(err);
    }
  });
}

/**
 * Initial GPT configuration
 * @param {boolean} loadGptScript If true it will load the gpt.js script asynchronously
 */
export function configure() {
  return new Promise(resolve => {
    const { googletag } = window;
    log('configure() start');
    googletag.cmd.push(() => {
      // googletag.pubads().collapseEmptyDivs(false);
      googletag.pubads().setCentering(true);
      googletag.pubads().enableSingleRequest();
      googletag.pubads().disableInitialLoad();
      log('configure() done');
      resolve();
    });
  });
}
/**
 * Load GPT script tag
 */
export function loadGptScript() {
  log('loadGptScript() start');
  return loadScriptAsync('https://www.googletagservices.com/tag/js/gpt.js')
    .then(() => log('loadGptScript() loaded'))
    .catch(error => log(error));
}

/**
 * Define slot
 *
 * @param {any} ad
 * @returns {promise} Promise that resolves when the gpt command is executed
 */
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

/**
 * enabled
 *
 * @returns {promise} Promise that resolves when the gpt command is executed
 */
export function enable() {
  return new Promise(resolve => {
    const { googletag } = window;
    log('enable() start');
    googletag.cmd.push(() => {
      googletag.enableServices();
      setReadyCondition('gptEnabled', true);
      log('enable() done');
      resolve();
    });
  });
}

/**
 * Connects the adloader event listeners to the standard gpt event listeners
 *
 * @returns {promise} Promise that resolves when the gpt command is executed
 */
export function addEventListeners() {
  return new Promise(resolve => {
    const { googletag } = window;
    log('addEventListeners() start');
    googletag.cmd.push(() => {
      googletag.pubads().addEventListener('slotOnload', onSlotLoad);
      googletag.pubads().addEventListener('slotRenderEnded', onSlotRenderEnded);
      googletag
        .pubads()
        .addEventListener('impressionViewable', onImpressionViewable);
      log('addEventListeners() done');
      resolve();
    });
  });
}

/**
 * Set adloader targeting
 * @param {any} targeting
 * @returns {promise} Promise that resolves when the gpt command is executed
 */
export function setTargeting(targeting) {
  return new Promise(resolve => {
    log('setTargeting() start');
    const { googletag } = window;
    googletag.cmd.push(() => {
      Object.keys(targeting).forEach(key => {
        const value = targeting[key];
        log('Set targeting', key, 'to', value);
        googletag.pubads().setTargeting(key, value);
      });
      log('setTargeting() done');
      resolve();
    });
  });
}
