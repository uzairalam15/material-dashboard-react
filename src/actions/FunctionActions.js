import {
  GET_FUNCTIONS_SUCCESS,
  ADD_FUNCTION_SUCCESS,
  ADD_SUB_FUNCTION_SUCCESS,
  UPDATE_FUNCTION_SUCCESS,
  UPDATE_SUB_FUNCTION_SUCCESS,
  DELETE_FUNCTION_SUCCESS,
  DELETE_SUB_FUNCTION_SUCCESS,
  GET_SUB_FUNCTIONS_SUCCESS,
  ADD_SUB_FUNCTIONS_SUCCESS
} from "constants/FunctionTypes";
import {
  getFunctions,
  getSubFunctions,
  createFunction,
  createSubFunction
} from "sources/FunctionSource";

export const getFunctionsSuccess = data => ({
  type: GET_FUNCTIONS_SUCCESS,
  data
});

export const addFunctionSuccess = data => ({
  type: ADD_FUNCTION_SUCCESS,
  data
});

export const updateFunctionSuccess = data => ({
  type: UPDATE_FUNCTION_SUCCESS,
  data
});

export const deleteFunctionSuccess = data => ({
  type: DELETE_FUNCTION_SUCCESS,
  data
});

export const addSubFunctionSuccess = (data, id) => ({
  type: ADD_SUB_FUNCTION_SUCCESS,
  data,
  id
});

export const updateSubFunctionSuccess = (data, id) => ({
  type: UPDATE_SUB_FUNCTION_SUCCESS,
  data,
  id
});

export const deleteSubFunctionSuccess = (data, id) => ({
  type: DELETE_SUB_FUNCTION_SUCCESS,
  data,
  id
});

export const getSubFunctionsSuccess = (data, id) => ({
  type: GET_SUB_FUNCTIONS_SUCCESS,
  data,
  id
});

export const getFunctionsAction = id => getFunctions(id);
export const getSubFunctionsAction = id => getSubFunctions(id);
export const createFunctionAction = data => createFunction(data);
export const createSubFunctionAction = data => createSubFunction(data);
