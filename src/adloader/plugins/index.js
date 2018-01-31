import { adloader } from '../index';
import { createLogger } from '../log';
import { promiseSerial } from '../promiseSerial';

export function registerPlugins(plugins) {
  const log = createLogger('adloader:registerPlugins');
  log(`Register ${plugins.length} plugins start`);
  promiseSerial(plugins, adloader)
    .then(() => {
      log(`Register ${plugins.length} plugins done`);
      adloader.setReadyCondition('pluginsReady', true);
    })
    .catch(err => {
      log(err.message);
      adloader.setReadyCondition('pluginsReady', false);
    });
}
