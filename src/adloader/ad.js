import adloader from './index';
import dispatch from './dispatch';
import subscribe from './subscribe';
import * as gpt from './gpt';
import { isNotEmptyArray } from './validators';

const R = require('rambda');
const elementReady = require('element-ready-es5');
const debug = require('debug');

export function getAdById(id) {
  const adConfig = adloader.ads.find(item => item.id === id);
  return adConfig.ad;
}

/**
 * Configure many ads at once
 * @param {array} ads Array of ads to configure
 */
export function createAds(ads = []) {
  const log = debug('adloader:ad:createAds');
  log(`Creating ${ads.length} ads`);
  const result = ads.map(adConfig => {
    log(`Creating ad with ID ${adConfig.id}`);
    const ad = new Ad(adConfig);
    return ad;
  });
  log('Done');
  return result;
}

/**
 * The actual ads are instances of this class
 *
 *
 * @class Ad
 */
class Ad {
  /**
   * Creates an instance of Ad.
   * @param {any} { id, plugins, size, targeting }
   * @memberof Ad
   */
  constructor({ id, plugins, size, targeting }) {
    this.log = debug(`adloader:ad:${id}`);
    this.log('Constructor');

    this.adUnit = adloader.adUnit;
    this.id = id;
    this.plugins = [];
    this.size = size;
    this.targeting = targeting;
    this.isEmpty = true;
    this.isNativeAd = false;
    this.isBannerAd = false;
    this.width = false;
    this.height = false;
    this.element = false;
    this.slot = false;
    this.ready = false;
    this.hasBeenDisplayed = false;

    this.readyConditions = {
      pluginsReady: false,
      elementReady: false,
    };

    this.registerPlugins(plugins);
    this.getElement();

    this.readyUnsubscribe = subscribe('ready', this.display);
  }

  // Try to display ad
  display = async () => {
    // Adloader is ready, ad is ready and ad has not already been displayed
    if (adloader.ready && this.ready && !this.hasBeenDisplayed) {
      this.hasBeenDisplayed = true;
      this.log('Display');
      this.slot = await gpt.defineSlot(this);
      this.log(this.slot);
      await gpt.setAdTargeting(this);
      await gpt.display(this.id);
      await gpt.refresh([this.slot]);
    }
  };

  getElement = async () => {
    elementReady(`#${this.id}`).then(el => {
      this.element = el;
      this.setReadyCondition('elementReady', true);
      dispatch('ad:elementReady', this);
    });
  };

  /**
   * Update a ready condition and trigger ready if all conditions are true after update
   * @param {string} name Name of condition to update
   * @param {boolean} value The condition is either true or false
   */
  setReadyCondition = async (name, value) => {
    // Update readyCondition with new value
    this.log(`Setting ready condition ${name} to ${value}`);
    this.readyConditions[name] = value;

    if (value === true) {
      // A true value causes all conditions to be checked
      if (!this.ready) {
        // All values of this.readyConditions equals true
        if (R.all(x => x === true, R.values(this.readyConditions))) {
          this.ready = true;
          this.log('Ready');
          this.display();
          dispatch('ad:ready', this);
        }
      }
    }
  };

  /**
   * Register an array of plugins
   * @param {array} plugins Array of plugins to register
   * @memberof Ad
   */
  registerPlugins = plugins => {
    if (isNotEmptyArray(plugins)) {
      this.log(`Register ${plugins.length} plugins`);
      plugins.forEach(plugin => this.registerPlugin(plugin));
    }
    this.setReadyCondition('pluginsReady', true);
  };

  registerPlugin = plugin => {
    this.log('register plugin');
    plugin(this);
  };
}
