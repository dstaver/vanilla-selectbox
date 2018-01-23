import adloader from './index';

describe('State', () => {
  test('Should have empty ads array', () => {
    expect(adloader.ads).toHaveLength(0);
  });
  test('It should only be possible to assign numbers between 6 and 24 to adloader.labelHeight', () => {
    expect(adloader.labelHeight).toBe(11);
    adloader.labelHeight = 24;
    expect(adloader.labelHeight).toBe(24);
    adloader.labelHeight = 25;
    expect(adloader.labelHeight).toBe(24);
    adloader.labelHeight = 6;
    expect(adloader.labelHeight).toBe(6);
    adloader.labelHeight = 5;
    expect(adloader.labelHeight).toBe(6);
  });
});
