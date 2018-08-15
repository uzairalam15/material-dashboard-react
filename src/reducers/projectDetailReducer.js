import {
  GET_FUNCTIONS_SUCCESS,
  GET_SUB_FUNCTIONS_SUCCESS,
  ADD_FUNCTION_SUCCESS,
  UPDATE_FUNCTION_SUCCESS,
  UPDATE_SUB_FUNCTION_SUCCESS,
  DELETE_FUNCTION_SUCCESS,
  DELETE_SUB_FUNCTION_SUCCESS,
  ADD_SUB_FUNCTION_SUCCESS
} from "constants/FunctionTypes";
import {
  SET_PROJECT,
  GET_INPUTS_SUCCESS,
  GET_OUTPUTS_SUCCESS,
  ADD_INPUT_SUCCESS,
  ADD_OUTPUT_SUCCESS,
  UPDATE_INPUT_SUCCESS,
  UPDATE_OUTPUT_SUCCESS,
  DELETE_INPUT_SUCCESS,
  DELETE_OUTPUT_SUCCESS,
  GET_FAILURE_MODES_SUCCESS,
  ADD_FAILURE_MODE_SUCCESS,
  TOGGLE_LOADER,
  GET_FAILURE_EFFECTS_SUCCESS,
  GET_FAILURE_CAUSES_SUCCESS,
  ADD_FAILURE_EFFECT_SUCCESS,
  ADD_FAILURE_CAUSE_SUCCESS
} from "constants/ProjectTypes";
import initialState from "../store/initialState";
import {
  getIndexAndObjectofId,
  editItemAtIndex,
  getIndexOfId
} from "utils/helpers";

function updateItem(array, updatedItem) {
  const index = getIndexOfId(array, updatedItem.id);
  return editItemAtIndex(array, updatedItem, index);
}

function updateSubFunction(functions, newSubFunctions, functionId) {
  const { object, index } = getIndexAndObjectofId(functions, functionId);
  const subfunctionIndex = getIndexOfId(
    object.subFunctions,
    newSubFunctions.id
  );
  object.subFunctions = editItemAtIndex(
    object.subFunctions,
    newSubFunctions,
    subfunctionIndex
  );
  return editItemAtIndex(functions, object, index);
}

function appendCause(modes, cause, id) {
  const element = getIndexAndObjectofId(modes, id);
  const newElement = Object.assign({}, element.object, {
    causes: Array.isArray(cause) ? cause : [cause, ...element.object.causes],
    childrenFetched: true
  });
  return editItemAtIndex(modes, newElement, element.index);
}

function appendEffect(modes, effect, id) {
  const element = getIndexAndObjectofId(modes, id);
  const newElement = Object.assign({}, element.object, {
    effects: Array.isArray(effect)
      ? effect
      : [effect, ...element.object.effects],
    childrenFetched: true
  });
  return editItemAtIndex(modes, newElement, element.index);
}

function appendSubFunction(functions, subFunctions, functionId) {
  const element = getIndexAndObjectofId(functions, functionId);
  const newElement = Object.assign({}, element.object, {
    subFunctions: Array.isArray(subFunctions)
      ? subFunctions
      : [...element.object.subFunctions, subFunctions],
    subFuncFetched: true
  });
  return editItemAtIndex(functions, newElement, element.index);
}

export default function projectDetailReducer(
  state = initialState.projectDetailReducer,
  action
) {
  switch (action.type) {
    case TOGGLE_LOADER:
      return Object.assign({}, state, {
        loader: !state.loader
      });

    case SET_PROJECT:
      return Object.assign({}, state, {
        project: action.data
      });

    case ADD_FUNCTION_SUCCESS:
      return Object.assign({}, state, {
        functions: [action.data, ...state.functions]
      });

    case UPDATE_FUNCTION_SUCCESS:
      return Object.assign({}, state, {
        functions: updateItem(state.functions, action.data)
      });

    case ADD_SUB_FUNCTION_SUCCESS:
      return Object.assign({}, state, {
        functions: appendSubFunction(state.functions, action.data, action.id)
      });

    case ADD_INPUT_SUCCESS:
      return Object.assign({}, state, {
        inputs: [action.data, ...state.inputs]
      });

    case UPDATE_INPUT_SUCCESS:
      return Object.assign({}, state, {
        inputs: updateItem(state.inputs, action.data)
      });

    case UPDATE_OUTPUT_SUCCESS:
      return Object.assign({}, state, {
        outputs: updateItem(state.outputs, action.data)
      });

    case ADD_OUTPUT_SUCCESS:
      return Object.assign({}, state, {
        outputs: [action.data, ...state.outputs]
      });

    case GET_FAILURE_MODES_SUCCESS:
      return Object.assign({}, state, {
        failureModes: action.data,
        loader: false
      });

    case ADD_FAILURE_MODE_SUCCESS:
      return Object.assign({}, state, {
        failureModes: [action.data, ...state.failureModes],
        loader: false
      });

    case ADD_FAILURE_EFFECT_SUCCESS:
      return Object.assign({}, state, {
        failureModes: appendEffect(state.failureModes, action.data, action.id),
        loader: false
      });

    case ADD_FAILURE_CAUSE_SUCCESS:
      return Object.assign({}, state, {
        failureModes: appendCause(state.failureModes, action.data, action.id),
        loader: false
      });

    case GET_FAILURE_EFFECTS_SUCCESS:
      return Object.assign({}, state, {
        failureModes: appendEffect(state.failureModes, action.data, action.id),
        loader: false
      });

    case GET_FAILURE_CAUSES_SUCCESS:
      return Object.assign({}, state, {
        failureModes: appendCause(state.failureModes, action.data, action.id),
        loader: false
      });

    case GET_FUNCTIONS_SUCCESS:
      return Object.assign({}, state, {
        functions: action.data
      });

    case GET_INPUTS_SUCCESS:
      return Object.assign({}, state, {
        inputs: action.data,
        loader: false
      });

    case GET_OUTPUTS_SUCCESS:
      return Object.assign({}, state, {
        outputs: action.data,
        loader: false
      });

    case GET_SUB_FUNCTIONS_SUCCESS:
      return Object.assign({}, state, {
        functions: appendSubFunction(state.functions, action.data, action.id)
      });
    default:
      return state;
  }
}
