import adloader from './index';
import dispatch from './dispatch';

const R = require('rambda');
const log = require('debug')('adloader:setReadyCondition');

export async function setReadyCondition(name, value) {
  // Nothing happens if the value is the same as before
  if (R.prop(name, adloader.readyConditions) === value) {
    return;
  }
  // Update readyCondition with new value
  log(`Setting ready condition ${name} to ${value}`);
  adloader.readyConditions[name] = value;

  // No further checking neccessary
  if (adloader.ready && value === true) {
    return;
  }

  // A true value causes all conditions to be checked
  if (!adloader.ready && value === true) {
    // All values of adloader.readyConditions equals true
    if (R.all(x => x === true, R.values(adloader.readyConditions))) {
      adloader.ready = true;
      dispatch('ready', true);
    }
  }
}
