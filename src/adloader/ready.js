/** @module ready */
import all from 'rambda/lib/all';
import values from 'rambda/lib/values';
import { createLogger } from './log';
import { dispatch } from './events';

const log = createLogger('adloader:ready');

const readyConditions = {};
let ready = false;

/**
 * Add one or more ready conditions
 * @param {...string} args Name of conditions to remove
 */
export function addReadyConditions(...args) {
  args.forEach(arg => {
    readyConditions[arg] = false;
  });
}

/**
 * Get value of ready condition by name
 * @param {string} name
 * @returns {boolean|undefined} True or false if condition exists, undefined if not
 */
export function getReadyCondition(name) {
  return readyConditions[name];
}

/**
 * Remove ready condition and update readystate
 * @param {string} name Name of condition to remove
 */
export function removeReadyCondition(name) {
  delete readyConditions[name];
  isReady();
}

/**
 * Check if all ready conditions are true and update the ready state.
 * Dispatches ready event whenever the ready state changes from false to true
 * @returns {boolean} True if ready
 */
export function isReady() {
  log('Checking ready state');
  // Check all ready conditions
  if (all(value => value === true, values(readyConditions))) {
    // Dispatch ready event only if ready was previously false
    if (!ready === true) {
      ready = true;
      dispatch('ready', true);
    }
  } else {
    ready = false;
  }
  return ready;
}

/**
 * Set named ready condition to true or false
 * Return ready state
 * @param {any} name Name of condition to set
 * @param {boolean} value True or false
 * @returns {boolean} Ready state
 */
export function setReadyCondition(name, value) {
  readyConditions[name] = !!value;
  return isReady();
}
