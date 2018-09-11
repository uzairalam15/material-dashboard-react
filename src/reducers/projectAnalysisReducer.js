import {
  SET_SELECTED_ITEM,
  SET_SELECTED_NODE,
  SET_FUNCTION_DATA
} from "constants/ItemTypes";

import { TOGGLE_LOADER } from "constants/ProjectTypes";

import initialState from "../store/initialState";
import {
  getIndexAndObjectofId,
  editItemAtIndex,
  getObjectOfId,
  getIndexOfId,
  removeItemAtIndex
} from "utils/helpers";

function updateProgram(programs, updatedProgram) {
  const { object, index } = getIndexAndObjectofId(programs, updatedProgram.id);
  return editItemAtIndex(programs, updatedProgram, index);
}

function removeProgram(programs, id) {
  const { object, index } = getIndexAndObjectofId(programs, id);
  return removeItemAtIndex(programs, index);
}

export default function projectAnalysisReducer(
  state = initialState.projectAnalysisReducer,
  action
) {
  switch (action.type) {
    case SET_SELECTED_ITEM:
      return Object.assign({}, initialState, {
        selectedItem: action.data
      });

    case "CLEAR_PROJECT":
      return Object.assign({}, state, initialState.projectAnalysisReducer);
    case TOGGLE_LOADER:
      return Object.assign({}, state, {
        loader: !state.loader
      });
    case SET_FUNCTION_DATA:
      return Object.assign({}, state, {
        functionData: action.data,
        loader: false
      });

    case SET_SELECTED_NODE:
      return Object.assign({}, state, {
        selectedNode: action.data.node,
        selectedNodeType: action.data.type
      });
    default:
      return state;
  }
}
