import {
  GET_FAILURE_MODES_SUCCESS,
  ADD_FAILURE_MODE_SUCCESS,
  UPDATE_FAILURE_MODE_SUCCESS,
  DELETE_FAILURE_MODE_SUCCESS,
  SET_SELECTED_FAILURE_MODE
} from "constants/FailureModeTypes";
import {
  getFailureModes,
  createFailureMode,
  updateFailureMode,
  deleteFailureMode
} from "sources/FailureModeSource";

export const getFailureModesSuccess = data => ({
  type: GET_FAILURE_MODES_SUCCESS,
  data
});

export const addFailureModeSuccess = data => ({
  type: ADD_FAILURE_MODE_SUCCESS,
  data
});

export const deleteFailureModeSuccess = id => ({
  type: DELETE_FAILURE_MODE_SUCCESS,
  id
});

export const setSelectedFailureMode = id => ({
  type: SET_SELECTED_FAILURE_MODE,
  id
});

export const updateFailureModeSuccess = data => ({
  type: UPDATE_FAILURE_MODE_SUCCESS,
  data
});

export const getFailureModesAction = id => getFailureModes(id);
export const createFailureModeAction = data => createFailureMode(data);
export const updateFailureModeAction = (data, id) =>
  updateFailureMode(data, id);
export const deleteFailureModeAction = id => deleteFailureMode(id);
