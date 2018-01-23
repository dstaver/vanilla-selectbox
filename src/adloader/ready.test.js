import subscribe from './subscribe';
import adloader from './index';
import { setReadyCondition } from './ready';

test('Set ready condition', () => {
  expect.assertions(2);
  subscribe('ready', readyState => expect(readyState).toBe(true));
  return setReadyCondition('test', true).then(() =>
    expect(adloader.readyConditions.test).toBe(true)
  );
});
