import adloader from '../';
import { state } from '../state';
import { setReadyCondition } from '../ready';

const debug = require('debug');

export async function registerPlugins() {
  const log = debug('adloader:registerPlugins');
  log(`Register ${state.plugins.length} plugins`);
  await setReadyCondition('pluginsReady', false);
  state.plugins.forEach(async plugin => {
    const status = await plugin(adloader);
    log(status);
  });
  await setReadyCondition('pluginsReady', true);
}
