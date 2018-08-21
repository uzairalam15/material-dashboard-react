import {
  GET_FAILURE_CAUSES_SUCCESS,
  ADD_FAILURE_CAUSE_SUCCESS,
  UPDATE_FAILURE_CAUSE_SUCCESS,
  DELETE_FAILURE_CAUSE_SUCCESS,
  SET_SELECTED_FAILURE_CAUSE
} from "constants/FailureCauseTypes";
import {
  getFailureCauses,
  createFailureCause,
  updateFailureCause,
  deleteFailureCause
} from "sources/FailureCauseSource";

export const getFailureCausesSuccess = data => ({
  type: GET_FAILURE_CAUSES_SUCCESS,
  data
});

export const addFailureCauseSuccess = data => ({
  type: ADD_FAILURE_CAUSE_SUCCESS,
  data
});

export const deleteFailureCauseSuccess = id => ({
  type: DELETE_FAILURE_CAUSE_SUCCESS,
  id
});

export const setSelectedFailureCause = id => ({
  type: SET_SELECTED_FAILURE_CAUSE,
  id
});

export const updateFailureCauseSuccess = data => ({
  type: UPDATE_FAILURE_CAUSE_SUCCESS,
  data
});

export const getFailureCausesAction = id => getFailureCauses(id);
export const createFailureCauseAction = data => createFailureCause(data);
export const updateFailureCauseAction = (data, id) =>
  updateFailureCause(data, id);
export const deleteFailureCauseAction = id => deleteFailureCause(id);
