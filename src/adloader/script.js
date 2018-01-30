/** @module script */
import { createLogger } from './log';

const log = createLogger('adloader:loadScript');
/**
 * Promisified script loader
 *
 * @example
 * // Load Audience Reports and log to the console when done
 * loadScriptAsync('//sak.userreport.com/startsiden/launcher.js')
 * .then(() => {
 *   console.log('Audience Reports script loaded');
 * })
 * .catch((error) => {
 *   console.error(error.message);
 * });
 * @param {string} src URL of the script to load
 * @returns {promise} Promise that resolves when the script has loaded
 */
export function loadScriptAsync(src) {
  return new Promise((resolve, reject) => {
    const head = document.head || document.getElementsByTagName('head')[0];
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.charset = 'utf8';
    script.async = 'async';
    script.src = src;

    script.addEventListener('load', () => {
      log(`script ${src} loaded`);
      resolve();
    });

    script.addEventListener('error', e => {
      log(`script ${src} failed to load`, e.message);
      reject(e);
    });

    head.appendChild(script);
  });
}
