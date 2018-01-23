import adloader from './index';

const debug = require('debug');

export default async function subscribe(eventName, callback) {
  const log = debug(`adloader:event:${eventName}`);
  log('Add subscriber');

  // Register the event if it doesn't already exist
  if (!Array.isArray(adloader.eventListeners[eventName])) {
    log('Register new event name');
    adloader.eventListeners[eventName] = [];
  }
  const listeners = adloader.eventListeners[eventName];
  listeners.push(callback);

  // Return a callback to remove the listener
  return () => {
    listeners.splice(listeners.indexOf(callback), 1);
  };
}
