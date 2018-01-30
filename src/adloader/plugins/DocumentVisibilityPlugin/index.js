import { createLogger } from '../../log';

const log = createLogger('adloader:DocumentVisibilityPlugin');

export default function DocumentVisibilityPlugin(adloader) {
  return new Promise(resolve => {
    log('Register plugin');

    adloader.setReadyCondition('documentVisible', !document.hidden);

    document.addEventListener('visibilitychange', () =>
      adloader.setReadyCondition('documentVisible', !document.hidden)
    );

    log('Plugin registered');

    resolve('DocumentVisibilityPlugin registered successfully');
  });
}
