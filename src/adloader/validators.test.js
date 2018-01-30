import * as v from './validators';

test('isString', () => {
  const trueValues = ['abc', '01234', 'Another string'];
  const falseValues = [1, { number: '1' }, false, true, undefined];
  trueValues.forEach(val => expect(v.isString(val)).toBe(true));
  falseValues.forEach(val => expect(v.isString(val)).toBe(false));
});

test('isNumeric', () => {
  const trueValues = [0, 1, 2, 10000];
  const falseValues = ['0', { number: '1' }, [2], 'a'];
  trueValues.forEach(val => expect(v.isNumeric(val)).toBe(true));
  falseValues.forEach(val => expect(v.isNumeric(val)).toBe(false));
});

test('isNotNumeric', () => {
  const trueValues = ['0', 'abc', { number: '1' }, [2], 'a'];
  const falseValues = [0, 1, 2, 10000, -500];
  trueValues.forEach(val => expect(v.isNotNumeric(val)).toBe(true));
  falseValues.forEach(val => expect(v.isNotNumeric(val)).toBe(false));
});

test('isBetween', () => {
  const trueValues = [[5, 2, 6], [2, 2, 6], [6, 2, 6]];
  const falseValues = [[1, 2, 6], [7, 2, 6], [3, 6, 2], ['1', 0, 2]];
  trueValues.forEach(([value, min, max]) =>
    expect(v.isBetween(value, min, max)).toBe(true)
  );
  falseValues.forEach(([value, min, max]) =>
    expect(v.isBetween(value, min, max)).toBe(false)
  );
});

test('isArray', () => {
  const trueValues = [[], [1], [1, 2, 3], ['a', 'b', 'c']];
  const falseValues = ['abc', { id: 'object' }, 123];
  trueValues.forEach(value => expect(v.isArray(value)).toBe(true));
  falseValues.forEach(value => expect(v.isArray(value)).toBe(false));
});

test('isArrayOfNumbers', () => {
  const trueValues = [[1, 2, 3, 4], [100], [-1, -2, -3], [-1000, -5000]];
  const falseValues = [[1, 2, '3'], ['a', 'b', 'c']];
  trueValues.forEach(value => expect(v.isArrayOfNumbers(value)).toBe(true));
  falseValues.forEach(value => expect(v.isArrayOfNumbers(value)).toBe(false));
});

test('isArrayOfStrings', () => {
  const trueValues = [['a', 'b', 'c'], ['a']];
  const falseValues = [[], [1, 2, '3']];
  trueValues.forEach(value => expect(v.isArrayOfStrings(value)).toBe(true));
  falseValues.forEach(value => expect(v.isArrayOfStrings(value)).toBe(false));
});

test('isNotEmptyArray', () => {
  const trueValues = [[1], [1, 2, 3], ['a', 'b', 'c']];
  const falseValues = [[], 'abc', { id: 'object' }, 123];
  trueValues.forEach(value => expect(v.isNotEmptyArray(value)).toBe(true));
  falseValues.forEach(value => expect(v.isNotEmptyArray(value)).toBe(false));
});

test('isValidTargetingOptions', () => {
  const trueValues = [
    {
      test: 'true',
      position: 'banner_top',
    },
  ];
  const falseValues = [
    {
      test: true,
    },
  ];
  trueValues.forEach(value =>
    expect(v.isValidTargetingOptions(value)).toBe(true)
  );
  falseValues.forEach(value =>
    expect(v.isValidTargetingOptions(value)).toBe(false)
  );
});
