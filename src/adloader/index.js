/**
 * @module adloader
 */
import * as gpt from './gpt';
import subscribe from './subscribe';
import dispatch from './dispatch';
import { createAds } from './ad';
import { setReadyCondition } from './ready';
import { registerPlugins } from './plugins';
import { isBetween, validateConfig } from './validators';

const debug = require('debug');

const privateState = {
  labelHeight: 11,
};

const adloader = {
  subscribe,
  dispatch,
  setReadyCondition,
  ads: [],
  global: false,
  initialized: false,
  loadGptScript: true,
  ready: false,
  set labelHeight(height) {
    if (isBetween(height, 6, 24)) {
      privateState.labelHeight = height;
    }
  },
  get labelHeight() {
    return privateState.labelHeight;
  },
  adUnit: '/36021320/ztest_autotest',
  testAdUnit: '/36021320/ztest_autotest',
  plugins: [],
  readyConditions: {
    initializationDone: false,
    pluginsReady: false,
    gptEnabled: false,
  },
  breakpoints: {
    desktop: 1025,
    mobile: 300,
    tablet: 768,
  },
  eventListeners: {
    configure: [],
    ready: [],
    adCreated: [],
    adLoad: [],
    adRender: [],
    adViewable: [],
    windowResize: [],
  },
  targeting: [['page', 'test'], ['tags', []], ['test', 'true']],
  init: async (config = {}, ads = []) => {
    const log = debug('adloader:init');

    if (adloader.initialized) {
      log('Adloader can only be initialized once');
      return;
    }

    log('Start');
    adloader.initialized = true;

    const errors = validateConfig(config);
    if (errors) {
      errors.forEach(error => log(error));
    } else {
      Object.assign(adloader, config);

      if (adloader.global) {
        log(`Exposing adloader with global window.${adloader.global}`);
        window[adloader.global] = adloader;
      }

      if (adloader.loadGptScript) {
        gpt.loadGptScript();
      }

      adloader.ads = createAds(ads);

      await gpt.configure();
      await gpt.setTargeting(adloader.targeting);
      await gpt.addEventListeners();
      await registerPlugins();
      await gpt.enable();
      setReadyCondition('initializationDone', true);
      log('Finish');
    }
  },
};

export default adloader;
