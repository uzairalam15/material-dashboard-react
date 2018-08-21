import {
  GET_FUNCTIONS_SUCCESS,
  ADD_FUNCTION_SUCCESS,
  UPDATE_FUNCTION_SUCCESS,
  DELETE_FUNCTION_SUCCESS,
  SET_SELECTED_FUNCTION
} from "constants/FunctionTypes";
import {
  getFunctions,
  createFunction,
  updateFunction,
  deleteFunction
} from "sources/FunctionSource";

export const getFunctionsSuccess = data => ({
  type: GET_FUNCTIONS_SUCCESS,
  data
});

export const addFunctionSuccess = data => ({
  type: ADD_FUNCTION_SUCCESS,
  data
});

export const deleteFunctionSuccess = id => ({
  type: DELETE_FUNCTION_SUCCESS,
  id
});

export const setSelectedFunction = id => ({
  type: SET_SELECTED_FUNCTION,
  id
});

export const updateFunctionSuccess = data => ({
  type: UPDATE_FUNCTION_SUCCESS,
  data
});

export const getFunctionsAction = id => getFunctions(id);
export const createFunctionAction = data => createFunction(data);
export const updateFunctionAction = (data, id) => updateFunction(data, id);
export const deleteFunctionAction = id => deleteFunction(id);
