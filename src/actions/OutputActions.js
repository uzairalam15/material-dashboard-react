import {
  GET_OUTPUTS_SUCCESS,
  ADD_OUTPUT_SUCCESS,
  UPDATE_OUTPUT_SUCCESS,
  DELETE_OUTPUT_SUCCESS,
  SET_SELECTED_OUTPUT
} from "constants/OutputTypes";
import {
  getOutputs,
  createOutput,
  updateOutput,
  deleteOutput
} from "sources/OutputSource";

export const getOutputsSuccess = data => ({
  type: GET_OUTPUTS_SUCCESS,
  data
});

export const addOutputSuccess = data => ({
  type: ADD_OUTPUT_SUCCESS,
  data
});

export const deleteOutputSuccess = id => ({
  type: DELETE_OUTPUT_SUCCESS,
  id
});

export const setSelectedOutput = id => ({
  type: SET_SELECTED_OUTPUT,
  id
});

export const updateOutputSuccess = data => ({
  type: UPDATE_OUTPUT_SUCCESS,
  data
});

export const getOutputsAction = id => getOutputs(id);
export const createOutputAction = data => createOutput(data);
export const updateOutputAction = (data, id) => updateOutput(data, id);
export const deleteOutputAction = id => deleteOutput(id);
