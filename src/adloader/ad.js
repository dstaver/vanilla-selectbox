import elementReady from 'element-ready-es5';
import all from 'rambda/lib/all';
import values from 'rambda/lib/values';

import { createLogger } from './log';
import { isReady } from './ready';
import { options } from './options';
import { dispatch, subscribe } from './events';
import * as v from './validators';

/**
 * Ads are created as instances of this class
 * @class Ad
 * @param {object}    options           Configuration options for the Ad
 * @param {string}    options.id        ID of the DOM element that will contain the ad
 * @param {array}     options.plugins   Array of plugins to use for the ad
 * @param {array}     options.size      Size to use for the ad
 * @param {targeting} options.targeting Targeting for the ad
 */
export class Ad {
  constructor({ id, plugins, size, targeting }) {
    this.log = createLogger(`adloader:ad:${id}`);
    this.log('Constructor');

    this.adUnit = options.adUnit;
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
    this.waitForElementReady();

    this.readyUnsubscribe = subscribe('ready', this.display.bind(this));
  }

  /**
   * Try to display the ad
   *
   * The ad will display if it hasn't already been displayed and all ready conditions are true
   * @memberof Ad
   */
  display() {
    this.log('Try to display');
    const ad = this;
    return new Promise((resolve, reject) => {
      if (isReady() && ad.ready && !ad.hasBeenDisplayed) {
        ad.hasBeenDisplayed = true;
        ad.log('Display');
        const { googletag } = window;
        googletag.cmd.push(() => {
          if (!ad.slot) {
            ad.log('googletag.defineSlot() start');
            ad.slot = googletag
              .defineSlot(ad.adUnit, ad.size, ad.id)
              .addService(googletag.pubads());
            ad.log('googletag.defineSlot() done');
            ad.log(ad.slot);
          }
          if (ad.slot) {
            if (ad.targeting) {
              ad.log('googletag.setTargeting() Start');
              Object.keys(ad.targeting).forEach(key => {
                const value = ad.targeting[key];
                if (value && (v.isString(value) || v.isNotEmptyArray(value))) {
                  ad.log(
                    `googletag.setTargeting() setting key *${key}* to ${value}`
                  );
                  ad.slot.setTargeting(key, value);
                }
              });
              ad.log('googletag.setTargeting() done');
            }
            ad.log('GPT: Refresh done');
            googletag.pubads().refresh([ad.slot], {
              changeCorrelator: false,
            });
            ad.log('GPT: Refresh done');
          }
        });
      } else {
        const err = new Error('Adloader or Ad is not ready');
        reject(err);
      }
    });
  }

  /**
   * Waits for the DOM element to exist, then sets the ready condition elementReady to true
   * @memberof Ad
   */
  waitForElementReady() {
    return elementReady(`#${this.id}`).then(el => {
      this.element = el;
      this.setReadyCondition('elementReady', true);
      dispatch('ad:elementReady', this);
    });
  }

  /**
   * Update a ready condition and trigger ready if all conditions are true after update
   * @param {string} name Name of condition to update
   * @param {boolean} value The condition is either true or false
   */
  setReadyCondition(name, value) {
    // Update readyCondition with new value
    this.log(`Setting ready condition ${name} to ${value}`);
    this.readyConditions[name] = value;

    if (value === true) {
      // A true value causes all conditions to be checked
      if (!this.ready) {
        // All values of this.readyConditions equals true
        if (all(x => x === true, values(this.readyConditions))) {
          this.ready = true;
          this.log('Ready');
          this.display()
            .then(() => dispatch('ad:ready', this))
            .catch(err => this.log(err.message));
        }
      }
    }
  }

  /**
   * Register an array of plugins
   * @param {array} plugins Array of plugins to register
   * @memberof Ad
   */
  registerPlugins(plugins) {
    if (v.isNotEmptyArray(plugins)) {
      this.log(`Register ${plugins.length} plugins`);
      plugins.forEach(plugin => this.registerPlugin(plugin));
    }
    this.setReadyCondition('pluginsReady', true);
  }

  /**
   * Register a plugin
   * @param {plugin} plugin Plugin to register
   * @memberof Ad
   */
  registerPlugin(plugin) {
    this.log('register plugin');
    plugin(this);
  }
}
