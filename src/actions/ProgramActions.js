import {
  GET_PROGRAMS_SUCCESS,
  ADD_PROGRAM_SUCCESS,
  UPDATE_PROGRAM_SUCCESS,
  DELETE_PROGRAM_SUCCESS
} from "constants/ProgramTypes";
import {
  getPrograms,
  createProgram,
  updateProgram,
  deleteProgram
} from "sources/ProgramSource";

export const getProgramsSuccess = data => ({
  type: GET_PROGRAMS_SUCCESS,
  data
});

export const addProgramSuccess = data => ({
  type: ADD_PROGRAM_SUCCESS,
  data
});

export const deleteProgramSuccess = id => ({
  type: DELETE_PROGRAM_SUCCESS,
  id
});

export const updateProgramSuccess = data => ({
  type: UPDATE_PROGRAM_SUCCESS,
  data
});

export const getProgramsAction = () => getPrograms();
export const createProgramAction = data => createProgram(data);
export const updateProgramAction = (data, id) => updateProgram(data, id);
export const deleteProgramAction = id => deleteProgram(id);
