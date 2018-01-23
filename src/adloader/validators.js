export const isString = value => typeof value === 'string';
export const isNumeric = value => typeof value === 'number';
export const isNotNumeric = value => typeof value !== 'number';
export const isBetween = (value, min, max) =>
  !!(
    isNumeric(min) &&
    isNumeric(max) &&
    isNumeric(value) &&
    value >= min &&
    value <= max
  );
export const isPositive = value => !!(isNumeric(value) && value > 0);
export const isNegative = value => !!(isNumeric(value) && value < 0);
export const isArray = value => !!(value && Array.isArray(value));
export const isNumericArray = value =>
  !!(value && Array.isArray(value) && !value.find(isNotNumeric));
export const isNotEmptyArray = value => !!(isArray(value) && value.length);
export const isTargetingArray = value => isArray(value) && value.find();
export const validateConfig = config => {
  const validKeys = ['global', 'plugins', 'breakpoints', 'targeting'];
  const errors = [];

  Object.keys(config).forEach(key => {
    if (validKeys.indexOf(key) === -1) {
      errors.push(`${key} is not a valid option`);
    }
  });

  if (config.global && !isString(config.global)) {
    errors.push('if defined, global must be a string');
  }

  if (config.plugins && !isNotEmptyArray(config.plugins)) {
    errors.push('if defined, plugins must be a array of Plugin instances');
  }

  if (errors.length) {
    return errors;
  }
  return false;
};
