/** @module script */
import { createLogger } from './log';

const log = createLogger('adloader:loadScript');
/**
 * Loads a script asynchronously and runs callback when the script has loaded
 *
 * @example
 * // Load Audience Reports and log to the console when done
 * loadScriptAsync('//sak.userreport.com/startsiden/launcher.js', () => {
 *   console.log('Audience Reports script loaded');
 * });
 * @param {string} src URL of the script to load
 * @param {function} cb Callback to run when the load is complete
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
