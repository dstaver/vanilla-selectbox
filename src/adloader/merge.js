// Added this to prevent mutating the target object
export default function merge(...args) {
  return deepExtend({}, ...args);
}

/*!
 * 21.11.2017 - Modified script to remove node dependency and make it work better
 * with TypeScript - Daniel Staver - ABC Startsiden AS
 *
 * @description Recursive object extending
 * @author Viacheslav Lotsmanov <lotsmanov89@gmail.com>
 * @license MIT
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2013-2015 Viacheslav Lotsmanov
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

function isSpecificValue(val) {
  return !!(val instanceof Date || val instanceof RegExp);
}

function cloneSpecificValue(val) {
  if (val instanceof Date) {
    return new Date(val.getTime());
  }
  if (val instanceof RegExp) {
    return new RegExp(val);
  }

  throw new Error('Unexpected situation');
}

/**
 * Recursive cloning array.
 */
function deepCloneArray(arr) {
  const clone = [];
  arr.forEach((item, index) => {
    if (typeof item === 'object' && item !== null) {
      if (Array.isArray(item)) {
        clone[index] = deepCloneArray(item);
      } else if (isSpecificValue(item)) {
        clone[index] = cloneSpecificValue(item);
      } else {
        clone[index] = deepExtend({}, item);
      }
    } else {
      clone[index] = item;
    }
  });
  return clone;
}

/**
 * Extening object that entered in first argument.
 *
 * Returns extended object or false if have no target object or incorrect type.
 *
 * If you wish to clone source object (without modify it), just use empty new
 * object as first argument, like this:
 *   deepExtend({}, yourObj_1, [yourObj_N]);
 */
export function deepExtend(...args) {
  if (args.length < 1 || typeof args[0] !== 'object') {
    return false;
  }

  if (args.length < 2) {
    return args[0];
  }

  const target = args[0];

  [].forEach.call(args, obj => {
    // skip argument if isn't an object, is null, or is an array
    if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
      return;
    }

    Object.keys(obj).forEach(key => {
      const src = target[key]; // source value
      const val = obj[key]; // new value

      // recursion prevention
      if (val === target) {
        return;
      }

      /**
       * if new value isn't object then just overwrite by new value
       * instead of extending.
       */
      if (typeof val !== 'object' || val === null) {
        target[key] = val;
        return;
      }

      // just clone arrays (and recursive clone objects inside)
      if (Array.isArray(val)) {
        target[key] = deepCloneArray(val);
        return;
      }

      // custom cloning and overwrite for specific objects
      if (isSpecificValue(val)) {
        target[key] = cloneSpecificValue(val);
        return;
      }

      // overwrite by new value if source isn't object or array
      if (typeof src !== 'object' || src === null || Array.isArray(src)) {
        target[key] = deepExtend({}, val);
        return;
      }

      // source value and new value is objects both, extending...
      target[key] = deepExtend(src, val);
    });
  });

  return target;
}
