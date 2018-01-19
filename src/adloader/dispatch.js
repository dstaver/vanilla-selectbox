import { state } from './state';

const debug = require('debug');
/**
 * Dispatch event
 *
 * @param {string} eventName
 * @param {object} data
 */
export async function dispatch(eventName, data) {
  const log = debug(`adloader:${eventName}`);
  log(`Dispatch ${eventName} event with data`, data);
  const listeners = state.eventListeners[eventName];
  if (listeners && Array.isArray(listeners) && listeners.length) {
    listeners.forEach(callback => callback(data));
  }
}
