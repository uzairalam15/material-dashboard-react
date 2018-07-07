import {
  GET_PROJECTS_SUCCESS,
  ADD_PROJECT_SUCCESS,
  GET_SUB_PROJECTS_SUCCESS,
  ADD_SUB_PROJECTS_SUCCESS,
  SET_PROJECT,
  GET_INPUTS_SUCCESS,
  GET_OUTPUTS_SUCCESS
} from "constants/ProjectTypes";
import {
  getProjects,
  getSubProjects,
  createProject,
  createSubProject,
  setAndFetchProject,
  createInput,
  createOutput
} from "sources/ProjectSource";

export const getProjectsSuccess = data => ({
  type: GET_PROJECTS_SUCCESS,
  data
});

export const getInputsSuccess = data => ({
  type: GET_INPUTS_SUCCESS,
  data
});

export const getOutputsSuccess = data => ({
  type: GET_OUTPUTS_SUCCESS,
  data
});

export const setProject = data => ({
  type: SET_PROJECT,
  data
});

export const getSubProjectsSuccess = (data, id) => ({
  type: GET_SUB_PROJECTS_SUCCESS,
  data,
  id
});

export const getProjectsAction = () => getProjects();
export const getSubProjectsAction = id => getSubProjects(id);
export const createProjectAction = data => createProject(data);
export const createInputAction = data => createInput(data);
export const createOutputAction = data => createOutput(data);
export const createSubProjectAction = data => createSubProject(data);
export const setAndFetchProjectAction = data => setAndFetchProject(data);
