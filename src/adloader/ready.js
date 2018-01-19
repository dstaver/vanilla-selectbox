import { state } from './state';
import { dispatch } from './dispatch';

const R = require('rambda');
const log = require('debug')('adloader:setReadyCondition');

export async function setReadyCondition(name, value) {
  // Nothing happens if the value is the same as before
  if (R.prop(name, state.readyConditions) === value) {
    return;
  }
  // Update readyCondition with new value
  log(`Setting ready condition ${name} to ${value}`);
  state.readyConditions[name] = value;

  // No further checking neccessary
  if (state.ready && value === true) {
    return;
  }

  // A true value causes all conditions to be checked
  if (!state.ready && value === true) {
    // All values of state.readyConditions equals true
    if (R.all(x => x === true, R.values(state.readyConditions))) {
      state.ready = true;
      dispatch('ready', true);
    }
  }
}
