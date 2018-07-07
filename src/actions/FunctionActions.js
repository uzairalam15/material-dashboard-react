import {
  GET_FUNCTIONS_SUCCESS,
  ADD_FUNCTION_SUCCESS,
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

export const getSubFunctionsSuccess = (data, id) => ({
  type: GET_SUB_FUNCTIONS_SUCCESS,
  data,
  id
});

export const getFunctionsAction = id => getFunctions(id);
export const getSubFunctionsAction = id => getSubFunctions(id);
export const createFunctionAction = data => createFunction(data);
export const createSubFunctionAction = data => createSubFunction(data);
