/**
 * @module state
 */

export const state = {
  ads: [],
  global: false,
  loadGptScript: true,
  labelHeight: 11,
  ready: false,
  adUnit: '/36021320/ztest_autotest',
  testAdUnit: '/36021320/ztest_autotest',
  plugins: [],
  readyConditions: {},
  breakpoints: {
    desktop: 1025,
    mobile: 300,
    tablet: 768,
  },
  eventListeners: {
    configure: [],
    ready: [],
    adCreated: [],
    adLoad: [],
    adRender: [],
    adViewable: [],
    windowResize: [],
  },
  targeting: {
    page: ['test'],
    tags: [],
    test: 'true',
  },
};
