import {
  GET_FUNCTIONS_SUCCESS,
  ADD_FUNCTION_SUCCESS,
  UPDATE_FUNCTION_SUCCESS,
  DELETE_FUNCTION_SUCCESS,
  SET_SELECTED_FUNCTION
} from "constants/FunctionTypes";
import {
  GET_ITEMS_SUCCESS,
  ADD_ITEM_SUCCESS,
  UPDATE_ITEM_SUCCESS,
  DELETE_ITEM_SUCCESS
} from "constants/ItemTypes";
import {
  GET_FAILURE_MODES_SUCCESS,
  ADD_FAILURE_MODE_SUCCESS,
  UPDATE_FAILURE_MODE_SUCCESS,
  DELETE_FAILURE_MODE_SUCCESS
} from "constants/FailureModeTypes";
import {
  GET_FAILURE_EFFECTS_SUCCESS,
  ADD_FAILURE_EFFECT_SUCCESS,
  UPDATE_FAILURE_EFFECT_SUCCESS,
  DELETE_FAILURE_EFFECT_SUCCESS
} from "constants/FailureEffectTypes";
import {
  GET_FAILURE_CAUSES_SUCCESS,
  ADD_FAILURE_CAUSE_SUCCESS,
  UPDATE_FAILURE_CAUSE_SUCCESS,
  DELETE_FAILURE_CAUSE_SUCCESS
} from "constants/FailureCauseTypes";
import {
  GET_NOISE_FACTORS_SUCCESS,
  ADD_NOISE_FACTOR_SUCCESS,
  UPDATE_NOISE_FACTOR_SUCCESS,
  DELETE_NOISE_FACTOR_SUCCESS
} from "constants/NoiseFactorTypes";
import {
  GET_PREVENTION_CONTROLS_SUCCESS,
  ADD_PREVENTION_CONTROL_SUCCESS,
  UPDATE_PREVENTION_CONTROL_SUCCESS,
  DELETE_PREVENTION_CONTROL_SUCCESS
} from "constants/PreventionControlTypes";
import {
  GET_SAFETY_REQUIREMENTS_SUCCESS,
  ADD_SAFETY_REQUIREMENT_SUCCESS,
  UPDATE_SAFETY_REQUIREMENT_SUCCESS,
  DELETE_SAFETY_REQUIREMENT_SUCCESS
} from "constants/SafetyRequirementTypes";
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
  TOGGLE_LOADER
} from "constants/ProjectTypes";
import initialState from "../store/initialState";
import {
  getIndexAndObjectofId,
  editItemAtIndex,
  getIndexOfId,
  removeItemAtIndex
} from "utils/helpers";

function updateItem(items, updatedItem) {
  const { index } = getIndexAndObjectofId(items, updatedItem.id);
  return editItemAtIndex(items, updatedItem, index);
}

function removeItem(items, id) {
  const { index } = getIndexAndObjectofId(items, id);
  return removeItemAtIndex(items, index);
}

// function updateSubFunction(functions, newSubFunctions, functionId) {
//   const { object, index } = getIndexAndObjectofId(functions, functionId);
//   const subfunctionIndex = getIndexOfId(
//     object.subFunctions,
//     newSubFunctions.id
//   );
//   object.subFunctions = editItemAtIndex(
//     object.subFunctions,
//     newSubFunctions,
//     subfunctionIndex
//   );
//   return editItemAtIndex(functions, object, index);
// }

// function appendCause(modes, cause, id) {
//   const element = getIndexAndObjectofId(modes, id);
//   const newElement = Object.assign({}, element.object, {
//     causes: Array.isArray(cause) ? cause : [cause, ...element.object.causes],
//     childrenFetched: true
//   });
//   return editItemAtIndex(modes, newElement, element.index);
// }

// function appendEffect(modes, effect, id) {
//   const element = getIndexAndObjectofId(modes, id);
//   const newElement = Object.assign({}, element.object, {
//     effects: Array.isArray(effect)
//       ? effect
//       : [effect, ...element.object.effects],
//     childrenFetched: true
//   });
//   return editItemAtIndex(modes, newElement, element.index);
// }

// function appendSubFunction(functions, subFunctions, functionId) {
//   const element = getIndexAndObjectofId(functions, functionId);
//   const newElement = Object.assign({}, element.object, {
//     subFunctions: Array.isArray(subFunctions)
//       ? subFunctions
//       : [...element.object.subFunctions, subFunctions],
//     subFuncFetched: true
//   });
//   return editItemAtIndex(functions, newElement, element.index);
// }

export default function projectDetailReducer(
  state = initialState.projectDetailReducer,
  action
) {
  switch (action.type) {
    case "CLEAR_PROJECT":
      return Object.assign({}, state, initialState.projectDetailReducer);

    case "CLEAR_MODE":
      return Object.assign({}, state, initialState, {
        failureCauses: [],
        failureEffects: [],
        noiseFactors: [],
        preventionControls: [],
        safetyRequirements: []
      });

    case "CLEAR_OUTPUT":
      return Object.assign({}, state, initialState, {
        failureModes: [],
        failureCauses: [],
        failureEffects: [],
        noiseFactors: [],
        preventionControls: [],
        safetyRequirements: []
      });

    case "CLEAR_CAUSE":
      return Object.assign({}, state, initialState, {
        noiseFactors: [],
        preventionControls: [],
        safetyRequirements: []
      });

    case "CLEAR_ITEM":
      return Object.assign({}, state, {
        functions: [],
        inputs: [],
        outputs: [],
        failureModes: [],
        failureCauses: [],
        failureEffects: [],
        noiseFactors: [],
        preventionControls: [],
        safetyRequirements: []
      });

    case TOGGLE_LOADER:
      return Object.assign({}, state, {
        loader: !state.loader
      });

    case GET_ITEMS_SUCCESS:
      return Object.assign({}, state, {
        items: action.data
      });

    case UPDATE_ITEM_SUCCESS:
      return Object.assign({}, state, {
        items: updateItem(state.items, action.data)
      });

    case DELETE_ITEM_SUCCESS:
      return Object.assign({}, state, {
        items: removeItem(state.items, action.id)
      });

    case GET_ITEMS_SUCCESS:
      return Object.assign({}, state, {
        items: action.data
      });

    case ADD_ITEM_SUCCESS:
      return Object.assign({}, state, {
        items: [action.data, ...state.items]
      });

    case GET_FUNCTIONS_SUCCESS:
      return Object.assign({}, state, {
        functions: action.data
      });

    case ADD_FUNCTION_SUCCESS:
      return Object.assign({}, state, {
        functions: [action.data, ...state.functions]
      });

    case UPDATE_FUNCTION_SUCCESS:
      return Object.assign({}, state, {
        functions: updateItem(state.functions, action.data)
      });

    case DELETE_FUNCTION_SUCCESS:
      return Object.assign({}, state, {
        functions: removeItem(state.functions, action.id)
      });

    case GET_INPUTS_SUCCESS:
      return Object.assign({}, state, {
        inputs: action.data
      });

    case ADD_INPUT_SUCCESS:
      return Object.assign({}, state, {
        inputs: [action.data, ...state.inputs]
      });

    case UPDATE_INPUT_SUCCESS:
      return Object.assign({}, state, {
        inputs: updateItem(state.inputs, action.data)
      });

    case DELETE_INPUT_SUCCESS:
      return Object.assign({}, state, {
        inputs: removeItem(state.inputs, action.id)
      });

    case GET_OUTPUTS_SUCCESS:
      return Object.assign({}, state, {
        outputs: action.data
      });

    case ADD_OUTPUT_SUCCESS:
      return Object.assign({}, state, {
        outputs: [action.data, ...state.outputs]
      });

    case UPDATE_OUTPUT_SUCCESS:
      return Object.assign({}, state, {
        outputs: updateItem(state.outputs, action.data)
      });

    case DELETE_OUTPUT_SUCCESS:
      return Object.assign({}, state, {
        outputs: removeItem(state.outputs, action.id)
      });
    case GET_FAILURE_MODES_SUCCESS:
      return Object.assign({}, state, {
        failureModes: action.data
      });

    case ADD_FAILURE_MODE_SUCCESS:
      return Object.assign({}, state, {
        failureModes: [action.data, ...state.failureModes]
      });

    case UPDATE_FAILURE_MODE_SUCCESS:
      return Object.assign({}, state, {
        failureModes: updateItem(state.failureModes, action.data)
      });

    case DELETE_FAILURE_MODE_SUCCESS:
      return Object.assign({}, state, {
        failureModes: removeItem(state.failureModes, action.id)
      });

    case GET_SAFETY_REQUIREMENTS_SUCCESS:
      return Object.assign({}, state, {
        safetyRequirements: action.data
      });

    case ADD_SAFETY_REQUIREMENT_SUCCESS:
      return Object.assign({}, state, {
        safetyRequirements: [action.data, ...state.safetyRequirements]
      });

    case UPDATE_SAFETY_REQUIREMENT_SUCCESS:
      return Object.assign({}, state, {
        safetyRequirements: updateItem(state.safetyRequirements, action.data)
      });

    case DELETE_SAFETY_REQUIREMENT_SUCCESS:
      return Object.assign({}, state, {
        safetyRequirements: removeItem(state.safetyRequirements, action.id)
      });

    case GET_PREVENTION_CONTROLS_SUCCESS:
      return Object.assign({}, state, {
        preventionControls: action.data
      });

    case ADD_PREVENTION_CONTROL_SUCCESS:
      return Object.assign({}, state, {
        preventionControls: [action.data, ...state.preventionControls]
      });

    case UPDATE_PREVENTION_CONTROL_SUCCESS:
      return Object.assign({}, state, {
        preventionControls: updateItem(state.preventionControls, action.data)
      });

    case DELETE_PREVENTION_CONTROL_SUCCESS:
      return Object.assign({}, state, {
        preventionControls: removeItem(state.preventionControls, action.id)
      });

    case GET_NOISE_FACTORS_SUCCESS:
      return Object.assign({}, state, {
        noiseFactors: action.data
      });

    case ADD_NOISE_FACTOR_SUCCESS:
      return Object.assign({}, state, {
        noiseFactors: [action.data, ...state.noiseFactors]
      });

    case UPDATE_NOISE_FACTOR_SUCCESS:
      return Object.assign({}, state, {
        noiseFactors: updateItem(state.noiseFactors, action.data)
      });

    case DELETE_NOISE_FACTOR_SUCCESS:
      return Object.assign({}, state, {
        noiseFactors: removeItem(state.noiseFactors, action.id)
      });

    case GET_FAILURE_EFFECTS_SUCCESS:
      return Object.assign({}, state, {
        failureEffects: action.data
      });

    case ADD_FAILURE_EFFECT_SUCCESS:
      return Object.assign({}, state, {
        failureEffects: [action.data, ...state.failureEffects]
      });

    case UPDATE_FAILURE_EFFECT_SUCCESS:
      return Object.assign({}, state, {
        failureEffects: updateItem(state.failureEffects, action.data)
      });

    case DELETE_FAILURE_EFFECT_SUCCESS:
      return Object.assign({}, state, {
        failureEffects: removeItem(state.failureEffects, action.id)
      });
    case GET_FAILURE_CAUSES_SUCCESS:
      return Object.assign({}, state, {
        failureCauses: action.data
      });

    case ADD_FAILURE_CAUSE_SUCCESS:
      return Object.assign({}, state, {
        failureCauses: [action.data, ...state.failureCauses]
      });

    case UPDATE_FAILURE_CAUSE_SUCCESS:
      return Object.assign({}, state, {
        failureCauses: updateItem(state.failureCauses, action.data)
      });

    case DELETE_FAILURE_CAUSE_SUCCESS:
      return Object.assign({}, state, {
        failureCauses: removeItem(state.failureCauses, action.id)
      });

    // case SET_PROJECT:
    //   return Object.assign({}, state, {
    //     project: action.data
    //   });

    // case ADD_INPUT_SUCCESS:
    //   return Object.assign({}, state, {
    //     inputs: [action.data, ...state.inputs]
    //   });

    // case UPDATE_INPUT_SUCCESS:
    //   return Object.assign({}, state, {
    //     inputs: updateItem(state.inputs, action.data)
    //   });

    // case UPDATE_OUTPUT_SUCCESS:
    //   return Object.assign({}, state, {
    //     outputs: updateItem(state.outputs, action.data)
    //   });

    // case ADD_OUTPUT_SUCCESS:
    //   return Object.assign({}, state, {
    //     outputs: [action.data, ...state.outputs]
    //   });

    // case GET_FAILURE_MODES_SUCCESS:
    //   return Object.assign({}, state, {
    //     failureModes: action.data,
    //     loader: false
    //   });

    // case ADD_FAILURE_MODE_SUCCESS:
    //   return Object.assign({}, state, {
    //     failureModes: [action.data, ...state.failureModes],
    //     loader: false
    //   });

    // case ADD_FAILURE_EFFECT_SUCCESS:
    //   return Object.assign({}, state, {
    //     failureModes: appendEffect(state.failureModes, action.data, action.id),
    //     loader: false
    //   });

    // case ADD_FAILURE_CAUSE_SUCCESS:
    //   return Object.assign({}, state, {
    //     failureModes: appendCause(state.failureModes, action.data, action.id),
    //     loader: false
    //   });

    // case GET_FAILURE_EFFECTS_SUCCESS:
    //   return Object.assign({}, state, {
    //     failureModes: appendEffect(state.failureModes, action.data, action.id),
    //     loader: false
    //   });

    // case GET_FAILURE_CAUSES_SUCCESS:
    //   return Object.assign({}, state, {
    //     failureModes: appendCause(state.failureModes, action.data, action.id),
    //     loader: false
    //   });

    // case GET_FUNCTIONS_SUCCESS:
    //   return Object.assign({}, state, {
    //     functions: action.data
    //   });

    // case GET_INPUTS_SUCCESS:
    //   return Object.assign({}, state, {
    //     inputs: action.data,
    //     loader: false
    //   });

    // case GET_OUTPUTS_SUCCESS:
    //   return Object.assign({}, state, {
    //     outputs: action.data,
    //     loader: false
    //   });

    // case GET_SUB_FUNCTIONS_SUCCESS:
    //   return Object.assign({}, state, {
    //     functions: appendSubFunction(state.functions, action.data, action.id)
    //   });
    default:
      return state;
  }
}
