import {
  GET_FUNCTIONS_SUCCESS,
  GET_SUB_FUNCTIONS_SUCCESS
} from "constants/FunctionTypes";
import {
  SET_PROJECT,
  GET_INPUTS_SUCCESS,
  GET_OUTPUTS_SUCCESS
} from "constants/ProjectTypes";
import initialState from "../store/initialState";
import { getIndexAndObjectofId, editItemAtIndex } from "utils/helpers";

function appendSubFunction(functions, subFunctions, functionId) {
  const element = getIndexAndObjectofId(functions, functionId);
  const newElement = Object.assign({}, element.object, {
    subFunctions,
    subFuncFetched: true
  });
  return editItemAtIndex(functions, newElement, element.index);
}

export default function projectDetailReducer(
  state = initialState.projectDetailReducer,
  action
) {
  switch (action.type) {
    case SET_PROJECT:
      return Object.assign({}, state, {
        project: action.data
      });

    case GET_FUNCTIONS_SUCCESS:
      return Object.assign({}, state, {
        functions: action.data
      });

    case GET_INPUTS_SUCCESS:
      return Object.assign({}, state, {
        inputs: action.data
      });

    case GET_OUTPUTS_SUCCESS:
      return Object.assign({}, state, {
        outputs: action.data
      });

    case GET_SUB_FUNCTIONS_SUCCESS:
      return Object.assign({}, state, {
        functions: appendSubFunction(state.functions, action.data, action.id)
      });
    default:
      return state;
  }
}
