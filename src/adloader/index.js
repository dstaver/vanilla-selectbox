/** @module adloader */
import { createLogger } from './log';

import * as gpt from './gpt';
import * as v from './validators';
import { getAds, createAds } from './ads';
import { setOptions } from './options';
import { addReadyConditions, setReadyCondition } from './ready';
import { registerPlugins } from './plugins/index';

const log = createLogger('adloader');

let initialized = false;

const adloader = {
  get ads() {
    return getAds();
  },
};

/**
 * Initialize adloader
 * @param config               {object}  Configuration object
 * @param config.global        {string}  Expose adloader as a global on window
 * @param config.loadGptScript {boolean} Load the gpt library. Disable if you want to load this on your own
 * @param config.labelHeight   {number}  Font size of ad labels
 * @param ads                  {array}   Array of ads to register
 */
export function init(opt, ads) {
  log('init() start');
  return new Promise((resolve, reject) => {
    if (initialized) {
      reject(
        new Error('Already initialized. Adloader can only be initialized once')
      );
    } else {
      initialized = true;
      addReadyConditions('initializationDone', 'pluginsReady', 'gptEnabled');
      createAds(ads);
      const options = setOptions(opt);

      if (v.isString(options.global)) {
        log(`Exposing adloader with global window.${options.global}`);
        window[options.global] = adloader;
      }

      if (options.loadGptScript) {
        gpt.loadGptScript();
      }

      gpt
        .configure(options.loadGptScript)
        .then(() => gpt.setTargeting(options.targeting))
        .then(gpt.addEventListeners)
        .then(() => registerPlugins(options.plugins))
        .then(gpt.enable)
        .then(() => {
          setReadyCondition('initializationDone', true);
          log('init() done');
          resolve();
        });
    }
  });
}
