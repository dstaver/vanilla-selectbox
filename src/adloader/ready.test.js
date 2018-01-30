import { subscribe } from './events';
import {
  isReady,
  getReadyCondition,
  addReadyConditions,
  setReadyCondition,
  removeReadyCondition,
} from './ready';

test('Is ready', () => {
  expect(getReadyCondition('test')).toBeUndefined();
  addReadyConditions('test');
  expect(getReadyCondition('test')).toBe(false);
  setReadyCondition('test', true);
  expect(isReady()).toBe(true);
  addReadyConditions('test2', 'test3');
  expect(isReady()).toBe(false);
  setReadyCondition('test2', true);
  setReadyCondition('test3', true);
  expect(isReady()).toBe(true);
});

test('Ready event fires', done => {
  subscribe('ready', ready => {
    expect(ready).toBe(true);
    done();
  });
  addReadyConditions('test1', 'test2');
  expect(getReadyCondition('test1')).toBe(false);
  expect(getReadyCondition('test2')).toBe(false);
  setReadyCondition('test1', true);
  setReadyCondition('test2', true);
});

test('Remove ready condition', () => {
  addReadyConditions('test1', 'test2');
  setReadyCondition('test1', true);
  expect(isReady()).toBe(false);
  removeReadyCondition('test2');
  expect(isReady()).toBe(true);
});
