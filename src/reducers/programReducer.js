import {
  GET_PROGRAMS_SUCCESS,
  ADD_PROGRAM_SUCCESS,
  UPDATE_PROGRAM_SUCCESS,
  DELETE_PROGRAM_SUCCESS,
  SET_SELECTED_PROGRAM
} from "constants/ProgramTypes";
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

export default function programReducer(
  state = initialState.programReducer,
  action
) {
  switch (action.type) {
    case GET_PROGRAMS_SUCCESS:
      return Object.assign({}, state, {
        programs: action.data
      });

    case ADD_PROGRAM_SUCCESS:
      return Object.assign({}, state, {
        programs: [action.data, ...state.programs]
      });

    case UPDATE_PROGRAM_SUCCESS:
      return Object.assign({}, state, {
        programs: updateProgram(state.programs, action.data)
      });

    case DELETE_PROGRAM_SUCCESS:
      return Object.assign({}, state, {
        programs: removeProgram(state.programs, action.id)
      });

    case SET_SELECTED_PROGRAM:
      return Object.assign({}, state, {
        selectedProgram: action.id || null
      });

    default:
      return state;
  }
}
