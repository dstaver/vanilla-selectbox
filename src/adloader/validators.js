/** @module validators */

import all from 'rambda/lib/all';
import values from 'rambda/lib/values';

/**
 * Tests if value is a string.
 *
 * Empty strings are allowed.
 * @param {any} value Value to test
 * @returns {boolean} True if valid
 */
export function isString(value) {
  return typeof value === 'string';
}
/**
 * Value is a string and at least on character long
 * @param {any} value Value to test
 * @returns {boolean} True if valid
 */
export function isNotEmptyString(value) {
  return typeof value === 'string' && value.length > 0;
}

/**
 * Test if value is an array
 * @param {any} value
 * @returns {boolean} True if valid
 */
export function isArray(value) {
  return !!(value && Array.isArray(value));
}

/**
 * Test of value is an object
 * @param {any} value
 * @returns {boolean} True if valid
 */
export function isObject(value) {
  return typeof value === 'object';
}

/**
 * Check that value has a minimum length
 * @param {number} [min=1] Minimum length
 * @returns {boolean} True if valid
 */
export function hasLength(value, min = 1) {
  return getLength(value) >= min;
}
/**
 * Get length of value
 * Amount of characters for strings
 * Amount of numbers for numbers (converts number to string to check length)
 * Amount of keys for objects
 * Amount of items for arrays
 * @param {any} value
 * @returns {boolean} True if valid
 */
export function getLength(value) {
  if (isString(value) || isArray(value)) {
    return value.length;
  }
  if (isNumeric(value)) {
    return String(value).length;
  }
  if (isObject(value)) {
    return Object.keys(value).length;
  }
  return 0;
}

/**
 * Test if value is a number
 * @param {any} value Value to test
 * @returns {boolean} True if valid
 */
export function isNumeric(value) {
  return typeof value === 'number';
}

/**
 * Test if value is not a number
 * @param {any} value Value to test
 * @returns {boolean} True if valid
 */
export function isNotNumeric(value) {
  return typeof value !== 'number';
}

/**
 * Test if value is a number between min and max
 * @param {any} value
 * @param {number} min
 * @param {number} max
 * @returns {boolean} True if valid
 */
export function isBetween(value, min, max) {
  return !!(
    isNumeric(min) &&
    isNumeric(max) &&
    isNumeric(value) &&
    value >= min &&
    value <= max
  );
}

/**
 * Test if value is a number greater than 0
 * @param {any} value
 * @returns {boolean} True if valid
 */
export function isPositive(value) {
  return !!(isNumeric(value) && value > 0);
}

/**
 * Test if value is a number less than zero
 * @param {any} value
 * @returns {boolean} True if valid
 */
export function isNegative(value) {
  return !!(isNumeric(value) && value < 0);
}

/**
 * Test if value is an array of numbers
 * @param {any} value
 * @returns {boolean} True if valid
 */
export function isArrayOfNumbers(value) {
  return !!(value && Array.isArray(value) && !value.find(isNotNumeric));
}

export function isArrayOfStrings(arr) {
  return !!(isNotEmptyArray(arr) && all(value => isString(value), arr));
}

/**
 * Test if value is an array with at least one value
 * @param {any} value
 * @returns {boolean} True if valid
 */
export function isNotEmptyArray(arr) {
  return !!(isArray(arr) && arr.length);
}

/**
 * Check if value is a valid targeting array for setTargeting
 * @param {any} value
 * @returns {boolean} True if valid
 */
export function isValidTargetingOptions(targeting) {
  return all(
    item => !!(isString(item) || isArrayOfStrings(item)),
    values(targeting)
  );
}
