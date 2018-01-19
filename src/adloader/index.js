/**
 * @module adloader
 */
import * as gpt from './gpt';
import { createAds } from './ad';
import { state } from './state';
import { subscribe } from './subscribe';
import { dispatch } from './dispatch';
import { setReadyCondition } from './ready';
import { registerPlugins } from './plugins';

const R = require('rambda');
const debug = require('debug');

const adloader = {
  state,
  subscribe,
  dispatch,
  setReadyCondition,
};

/**
 * Init Ad loader
 * @param {*} config Configuration object for adloader
 */
export async function init(config = {}, ads = []) {
  const log = debug('adloader:init');
  log('Start');

  createAds(ads);

  Object.keys(config).forEach(key => {
    if (R.has(key, state)) {
      log(`Setting state.${key} to ${config[key]}`);
      state[key] = config[key];
    } else {
      log(`Unknown state property: ${key}`);
    }
  });

  gpt.configure();

  if (state.global) {
    log(`Exposing adloader with global window.${state.global}`);
    window[state.global] = adloader;
  }

  await registerPlugins();

  log('Finish');
  return true;
}

export default adloader;
