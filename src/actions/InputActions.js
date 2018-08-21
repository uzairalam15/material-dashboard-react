import {
  GET_INPUTS_SUCCESS,
  ADD_INPUT_SUCCESS,
  UPDATE_INPUT_SUCCESS,
  DELETE_INPUT_SUCCESS,
  SET_SELECTED_INPUT
} from "constants/InputTypes";
import {
  getInputs,
  createInput,
  updateInput,
  deleteInput
} from "sources/InputSource";

export const getInputsSuccess = data => ({
  type: GET_INPUTS_SUCCESS,
  data
});

export const addInputSuccess = data => ({
  type: ADD_INPUT_SUCCESS,
  data
});

export const deleteInputSuccess = id => ({
  type: DELETE_INPUT_SUCCESS,
  id
});

export const setSelectedInput = id => ({
  type: SET_SELECTED_INPUT,
  id
});

export const updateInputSuccess = data => ({
  type: UPDATE_INPUT_SUCCESS,
  data
});

export const getInputsAction = id => getInputs(id);
export const createInputAction = data => createInput(data);
export const updateInputAction = (data, id) => updateInput(data, id);
export const deleteInputAction = id => deleteInput(id);
