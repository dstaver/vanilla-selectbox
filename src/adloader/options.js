/** @module options */
import { createLogger } from './log';

import * as v from './validators';

export const options = {
  global: false,
  loadGptScript: true,
  labelHeight: 11,
  adUnit: '/36021320/ztest_autotest',
  testAdUnit: '/36021320/ztest_autotest',
  targeting: {
    page: 'test',
    test: 'true',
  },
  plugins: [],
  breakpoints: {
    desktop: 1025,
    mobile: 300,
    tablet: 768,
  },
};

/**
 * Get option object
 * @returns {options} Current config
 */
export function getOptions() {
  return options;
}

/**
 * Update options with new values
 *
 * Keys that doesn't already exist are not allowed
 *
 * Use addOption()  to define new options
 * @param {object} opt New options object to apply to current options
 */
export function setOptions(opt) {
  const log = createLogger('adloader:options:setOptions');
  const errors = validateOptions(opt);
  if (errors) {
    errors.forEach(error => log(error));
  } else {
    Object.assign(options, opt);
    log('Updated options');
  }
  return options;
}

export function addOption() {}

/**
 * Validate adloader options object
 *
 * @param {any} config Config object to validate
 * @returns {array} Returns false, or array of errors if validation failed
 */
export function validateOptions(opt) {
  const validKeys = Object.keys(options);
  const errors = [];

  // Unknown config options are not allowed
  Object.keys(opt).forEach(key => {
    if (validKeys.indexOf(key) === -1) {
      errors.push(`${key} is not a valid option`);
    }
  });

  if (opt.global !== undefined && !v.isString(opt.global)) {
    errors.push('if defined, global must be a string');
  }

  if (opt.plugins !== undefined && !v.isNotEmptyArray(opt.plugins)) {
    errors.push('if defined, plugins must be an array of Plugin instances');
  }

  if (errors.length) {
    return errors;
  }
  return false;
}
