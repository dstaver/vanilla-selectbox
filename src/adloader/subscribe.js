import { state } from './state';

const debug = require('debug');

export async function subscribe(eventName, callback) {
  const log = debug(`adloader:${eventName}`);
  log('Add subscriber');

  // Register the event if it doesn't already exist
  if (!Array.isArray(state.eventListeners[eventName])) {
    log('Register new event name');
    state.eventListeners[eventName] = [];
  }
  const listeners = state.eventListeners[eventName];
  listeners.push(callback);

  // Return a callback to remove the listener
  return () => {
    listeners.splice(listeners.indexOf(callback), 1);
  };
}
