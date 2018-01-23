import adloader from './index';

const debug = require('debug');
/**
 * Dispatch event
 *
 * @param {string} eventName
 * @param {object} data
 */
export default async function dispatch(eventName, data) {
  const log = debug(`adloader:${eventName}`);
  log(`Dispatch ${eventName} event with data`, data);
  const listeners = adloader.eventListeners[eventName];
  if (listeners && Array.isArray(listeners) && listeners.length) {
    listeners.forEach(callback => callback(data));
  }
}
