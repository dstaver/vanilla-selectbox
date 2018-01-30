/** @module events */
import { createLogger } from '../log';

const eventListeners = {
  configure: [],
  ready: [],
  adCreated: [],
  adLoad: [],
  adRender: [],
  adViewable: [],
  windowResize: [],
};

/**
 * Subscribe to event
 *
 * @param {string} eventName
 * @param {any} callback
 * @returns {function} Function to remove the event subscriber
 */
export function subscribe(eventName, callback) {
  const log = createLogger(`adloader:event:${eventName}`);
  log('Add subscriber');

  // Register the event if it doesn't already exist
  if (!Array.isArray(eventListeners[eventName])) {
    log('Register new event name');
    eventListeners[eventName] = [];
  }
  const listeners = eventListeners[eventName];
  listeners.push(callback);

  // Return a callback to remove the listener
  return () => {
    listeners.splice(listeners.indexOf(callback), 1);
  };
}

/**
 * Dispatch event
 *
 * @param {string} eventName
 * @param {object} data
 */
export function dispatch(eventName, data) {
  const log = createLogger(`adloader:${eventName}`);
  log(`Dispatch ${eventName} event`);
  const listeners = eventListeners[eventName];
  if (listeners && Array.isArray(listeners) && listeners.length) {
    listeners.forEach(callback => {
      if (callback instanceof Promise) {
        callback(data).catch(err => log(err.message));
      } else {
        callback(data);
      }
    });
  }
}
