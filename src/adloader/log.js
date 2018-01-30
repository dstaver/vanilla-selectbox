/** @module log */
import path from 'rambda/lib/path';

const colorSupport = useColors();
const prefixes = [];
const loggers = {};
/**
 * Basic logger that preserves line numbers in browsers, supports prefixes and has pretty colors in supported browsers
 * @param {string} prefix Prefix for log messages
 * @returns {function} Colorized log function that prefixes all statements
 */
export function createLogger(prefix) {
  const debug = window && path('localStorage.debug', window);
  if (loggers[prefix]) {
    return loggers[prefix];
  }
  if (
    debug &&
    (prefix === debug ||
      (debug.endsWith('*') &&
        prefix.startsWith(debug.substr(0, debug.length - 1))))
  ) {
    if (colorSupport) {
      const color = selectColor(prefix);
      const colorStr = hslStr(color);
      const bgColorStr = hslStr(backgroundColor(color));
      loggers[prefix] = Function.prototype.bind.call(
        console.log,
        console,
        `%c${prefix}`,
        `color: ${colorStr}; background-color: ${bgColorStr}; padding-left: 5px; padding-right: 5px;`
      );
    } else {
      loggers[prefix] = Function.prototype.bind.call(
        console.log,
        console,
        prefix
      );
    }
    return loggers[prefix];
  }
  loggers[prefix] = () => null;
  return loggers[prefix];
}

/**
 * Select a color.
 * @param {string} prefix Prefix to create color for
 * @return {array} [H, S, L] color array
 */
function selectColor(prefix) {
  let index = prefixes.indexOf(prefix);
  if (index === -1) {
    index = prefixes.push(prefix);
  }
  // Amount to increment hue on each iteration
  const increment = 30;

  // Alternate to opposite hue on every other iteration
  const alt = index % 2 ? 128 : 0;

  // Calculate hue
  const h = (index * increment + alt) % 255;

  // Alternate between full and half saturation on every cycle through the hue spectrum
  const s = Math.floor(index * increment / 255) % 2 ? 50 : 100;
  return [h, s, 40];
}
/**
 * Convert HSL array to hsl() string usable as a CSS color value
 * @param {array} hslArray [H, S, L] Color array
 * @returns {string} hsl() string
 */
function hslStr(hslArray) {
  return `hsl(${hslArray[0]},${hslArray[1]}%,${hslArray[2]}%)`;
}

/**
 * Create a light background color from a color made by selectColor()
 * @param {array} hslArray HSL color to create beckground for
 * @returns {array} [H, S, L] Color array
 */
function backgroundColor(hslArray) {
  return [hslArray[0], hslArray[1], 94];
}

/**
 * Check if current browser supports console color styling
 * @returns {boolean} True if colors are supported
 */
function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (
    typeof window !== 'undefined' &&
    window.process &&
    window.process.type === 'renderer'
  ) {
    return true;
  }

  // Internet Explorer and Edge do not support colors.
  if (
    typeof navigator !== 'undefined' &&
    navigator.userAgent &&
    navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)
  ) {
    return false;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return (
    (typeof document !== 'undefined' &&
      document.documentElement &&
      document.documentElement.style &&
      document.documentElement.style.WebkitAppearance) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (typeof window !== 'undefined' &&
      window.console &&
      (window.console.firebug ||
        (window.console.exception && window.console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (typeof navigator !== 'undefined' &&
      navigator.userAgent &&
      navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) &&
      parseInt(RegExp.$1, 10) >= 31) ||
    // double check webkit in userAgent just in case we are in a worker
    (typeof navigator !== 'undefined' &&
      navigator.userAgent &&
      navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))
  );
}
