import {
  GET_FAILURE_EFFECTS_SUCCESS,
  ADD_FAILURE_EFFECT_SUCCESS,
  UPDATE_FAILURE_EFFECT_SUCCESS,
  DELETE_FAILURE_EFFECT_SUCCESS,
  SET_SELECTED_FAILURE_EFFECT
} from "constants/FailureEffectTypes";
import {
  getFailureEffects,
  createFailureEffect,
  updateFailureEffect,
  deleteFailureEffect
} from "sources/FailureEffectSource";

export const getFailureEffectsSuccess = data => ({
  type: GET_FAILURE_EFFECTS_SUCCESS,
  data
});

export const addFailureEffectSuccess = data => ({
  type: ADD_FAILURE_EFFECT_SUCCESS,
  data
});

export const deleteFailureEffectSuccess = id => ({
  type: DELETE_FAILURE_EFFECT_SUCCESS,
  id
});

export const setSelectedFailureEffect = id => ({
  type: SET_SELECTED_FAILURE_EFFECT,
  id
});

export const updateFailureEffectSuccess = data => ({
  type: UPDATE_FAILURE_EFFECT_SUCCESS,
  data
});

export const getFailureEffectsAction = id => getFailureEffects(id);
export const createFailureEffectAction = data => createFailureEffect(data);
export const updateFailureEffectAction = (data, id) =>
  updateFailureEffect(data, id);
export const deleteFailureEffectAction = id => deleteFailureEffect(id);
