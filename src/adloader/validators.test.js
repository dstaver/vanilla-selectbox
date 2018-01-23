import {
  isArray,
  isNotEmptyArray,
  isNumeric,
  isNumericArray,
  isBetween,
} from './validators';

test('isNumeric', () => {
  const trueValues = [0, 1, 2, 10000];
  const falseValues = ['0', { number: '1' }, [2], 'a'];
  trueValues.forEach(val => expect(isNumeric(val)).toBe(true));
  falseValues.forEach(val => expect(isNumeric(val)).toBe(false));
});

test('isBetween', () => {
  const trueValues = [[5, 2, 6], [2, 2, 6], [6, 2, 6]];
  const falseValues = [[1, 2, 6], [7, 2, 6], [3, 6, 2], ['1', 0, 2]];
  trueValues.forEach(([value, min, max]) =>
    expect(isBetween(value, min, max)).toBe(true)
  );
  falseValues.forEach(([value, min, max]) =>
    expect(isBetween(value, min, max)).toBe(false)
  );
});

test('isArray', () => {
  const trueValues = [[], [1], [1, 2, 3], ['a', 'b', 'c']];
  const falseValues = ['abc', { id: 'object' }, 123];
  trueValues.forEach(value => expect(isArray(value)).toBe(true));
  falseValues.forEach(value => expect(isArray(value)).toBe(false));
});

test('isNumericArray', () => {
  const trueValues = [[1, 2, 3, 4], [100], [-1, -2, -3], [-1000, -5000]];
  const falseValues = [[1, 2, '3'], ['a', 'b', 'c']];
  trueValues.forEach(value => expect(isNumericArray(value)).toBe(true));
  falseValues.forEach(value => expect(isNumericArray(value)).toBe(false));
});

test('isNotEmptyArray', () => {
  const trueValues = [[1], [1, 2, 3], ['a', 'b', 'c']];
  const falseValues = [[], 'abc', { id: 'object' }, 123];
  trueValues.forEach(value => expect(isNotEmptyArray(value)).toBe(true));
  falseValues.forEach(value => expect(isNotEmptyArray(value)).toBe(false));
});
