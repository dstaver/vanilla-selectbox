/**
 * @module gpt
 */
import { loadScriptAsync } from './loadScript';

const debug = require('debug');

window.googletag = window.googletag || {};
window.googletag.cmd = window.googletag.cmd || [];
const { googletag } = window;

/**
 * Initial GPT configuration
 * @export
 * @param {boolean} loadGptScript If true it will load the gpt.js script asynchronously
 */
export async function configure(loadGptScript) {
  const log = debug('adloader:gpt:configure');
  log('Start');
  if (loadGptScript) {
    log('Load gpt.js');
    loadScriptAsync('https://www.googletagservices.com/tag/js/gpt.js', () =>
      log('Load gpt.js')
    );
  }
  cmd(() => {
    googletag.pubads().collapseEmptyDivs();
    googletag.pubads().setCentering(true);
    googletag.pubads().enableSingleRequest();
    googletag.pubads().disableInitialLoad();
    log('Done');
  });
}

export function cmd(callback) {
  googletag.cmd.push(callback);
}
