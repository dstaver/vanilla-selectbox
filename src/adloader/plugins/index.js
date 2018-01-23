import adloader from '../index';
import { setReadyCondition } from '../ready';

const debug = require('debug');

export async function registerPlugins() {
  const log = debug('adloader:registerPlugins');
  log(`Register ${adloader.plugins.length} plugins`);
  adloader.plugins.forEach(async plugin => {
    const status = await plugin(adloader);
    log(status);
  });
  await setReadyCondition('pluginsReady', true);
}
