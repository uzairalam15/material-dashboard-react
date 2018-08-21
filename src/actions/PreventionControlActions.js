import {
  GET_PREVENTION_CONTROLS_SUCCESS,
  ADD_PREVENTION_CONTROL_SUCCESS,
  UPDATE_PREVENTION_CONTROL_SUCCESS,
  DELETE_PREVENTION_CONTROL_SUCCESS,
  SET_SELECTED_PREVENTION_CONTROL
} from "constants/PreventionControlTypes";
import {
  getPreventionControls,
  createPreventionControl,
  updatePreventionControl,
  deletePreventionControl
} from "sources/PreventionControlSource";

export const getPreventionControlsSuccess = data => ({
  type: GET_PREVENTION_CONTROLS_SUCCESS,
  data
});

export const addPreventionControlSuccess = data => ({
  type: ADD_PREVENTION_CONTROL_SUCCESS,
  data
});

export const deletePreventionControlSuccess = id => ({
  type: DELETE_PREVENTION_CONTROL_SUCCESS,
  id
});

export const setSelectedPreventionControl = id => ({
  type: SET_SELECTED_PREVENTION_CONTROL,
  id
});

export const updatePreventionControlSuccess = data => ({
  type: UPDATE_PREVENTION_CONTROL_SUCCESS,
  data
});

export const getPreventionControlsAction = id => getPreventionControls(id);
export const createPreventionControlAction = data =>
  createPreventionControl(data);
export const updatePreventionControlAction = (data, id) =>
  updatePreventionControl(data, id);
export const deletePreventionControlAction = id => deletePreventionControl(id);
