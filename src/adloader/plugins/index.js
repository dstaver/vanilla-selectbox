import { createLogger } from '../log';

import { setReadyCondition } from '../ready';

const adloader = {
  setReadyCondition,
};

export function registerPlugins(plugins) {
  const log = createLogger('adloader:registerPlugins');
  log(`Register ${plugins.length} plugins start`);
  promiseSerial(plugins, adloader)
    .then(() => {
      log(`Register ${plugins.length} plugins done`);
      setReadyCondition('pluginsReady', true);
    })
    .catch(err => {
      log(err.message);
      setReadyCondition('pluginsReady', false);
    });
}

function promiseSerial(list, args) {
  const p = Promise.resolve();
  return list.reduce((pacc, fn) => pacc.then(fn(args)), p);
}
