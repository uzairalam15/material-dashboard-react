import {
  GET_PROJECTS_SUCCESS,
  ADD_PROJECT_SUCCESS,
  ADD_SUB_PROJECT_SUCCESS,
  GET_SUB_PROJECTS_SUCCESS,
  ADD_SUB_PROJECTS_SUCCESS,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_SUB_PROJECT_SUCCESS,
  SET_PROJECT,
  GET_INPUTS_SUCCESS,
  GET_OUTPUTS_SUCCESS,
  DELETE_PROJECT_SUCCESS,
  DELETE_SUB_PROJECT_SUCCESS,
  ADD_INPUT_SUCCESS,
  ADD_OUTPUT_SUCCESS,
  UPDATE_INPUT_SUCCESS,
  UPDATE_OUTPUT_SUCCESS,
  GET_FAILURE_MODES_SUCCESS,
  GET_FAILURE_CAUSES_SUCCESS,
  GET_FAILURE_EFFECTS_SUCCESS,
  TOGGLE_LOADER,
  ADD_FAILURE_MODE_SUCCESS,
  ADD_FAILURE_CAUSE_SUCCESS,
  ADD_FAILURE_EFFECT_SUCCESS,
  UNSET_MESSAGE,
  SET_MESSAGE,
  SET_SELECTED_PROJECT
} from "constants/ProjectTypes";
import {
  getProjects,
  getSubProjects,
  createProject,
  createSubProject,
  updateProject,
  updateSubProject,
  deleteProject,
  deleteSubProject,
  setAndFetchProject,
  createInput,
  createOutput,
  getFailureModes,
  createFailureMode,
  getFailureEffects,
  getFailureCauses,
  createFailureCause,
  createFailureEffect,
  getInputs,
  getOutputs
} from "sources/ProjectSource";

export const toggleLoader = () => ({
  type: TOGGLE_LOADER
});

export const setSelectedProject = data => ({
  type: SET_SELECTED_PROJECT,
  data
});

export const unsetMessage = () => ({
  type: UNSET_MESSAGE
});

export const setMessage = data => ({
  type: SET_MESSAGE,
  data
});

export const getProjectsSuccess = data => ({
  type: GET_PROJECTS_SUCCESS,
  data
});

export const getFailureModesSuccess = data => ({
  type: GET_FAILURE_MODES_SUCCESS,
  data
});

export const addFailureModeSuccess = data => ({
  type: ADD_FAILURE_MODE_SUCCESS,
  data
});

export const addFailureEffectSuccess = (data, id) => ({
  type: ADD_FAILURE_EFFECT_SUCCESS,
  data,
  id
});

export const addFailureCauseSuccess = (data, id) => ({
  type: ADD_FAILURE_CAUSE_SUCCESS,
  data,
  id
});

export const getFailureEffectsSuccess = (data, id) => ({
  type: GET_FAILURE_EFFECTS_SUCCESS,
  data,
  id
});

export const getFailureCausesSuccess = (data, id) => ({
  type: GET_FAILURE_CAUSES_SUCCESS,
  data,
  id
});

export const addProjectSuccess = data => ({
  type: ADD_PROJECT_SUCCESS,
  data
});

export const deleteProjectSuccess = id => ({
  type: DELETE_PROJECT_SUCCESS,
  id
});

export const deleteSubProjectSuccess = (id, projectId) => ({
  type: DELETE_SUB_PROJECT_SUCCESS,
  projectId,
  id
});

export const addSubProjectSuccess = (data, id) => ({
  type: ADD_SUB_PROJECT_SUCCESS,
  data,
  id
});

export const updateProjectSuccess = data => ({
  type: UPDATE_PROJECT_SUCCESS,
  data
});

export const updateSubProjectSuccess = (data, projectId) => ({
  type: UPDATE_SUB_PROJECT_SUCCESS,
  data,
  projectId
});

export const addInputSuccess = data => ({
  type: ADD_INPUT_SUCCESS,
  data
});

export const addOutputSuccess = data => ({
  type: ADD_OUTPUT_SUCCESS,
  data
});

export const updateInputSuccess = data => ({
  type: UPDATE_INPUT_SUCCESS,
  data
});

export const updateOutputSuccess = data => ({
  type: UPDATE_OUTPUT_SUCCESS,
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

export const getProjectsAction = id => getProjects(id);
export const createProjectAction = data => createProject(data);
export const updateProjectAction = (data, id) => updateProject(data, id);
export const deleteProjectAction = id => deleteProject(id);
export const getSubProjectsAction = id => getSubProjects(id);
export const createSubProjectAction = data => createSubProject(data);
export const updateSubProjectAction = (data, id, projectId) =>
  updateSubProject(data, id, projectId);
export const deleteSubProjectAction = (id, projectId) =>
  deleteSubProject(id, projectId);
// export const getFailureModesAction = id => getFailureModes(id);
// export const getFailureEffectsAction = id => getFailureEffects(id);
// export const getFailureCausesAction = id => getFailureCauses(id);
// export const createFailureModeAction = data => createFailureMode(data);
// export const createFailureCauseAction = data => createFailureCause(data);
// export const createFailureEffectAction = data => createFailureEffect(data);
// export const getInputsAction = data => getInputs(data);
// export const getOutputsAction = data => getOutputs(data);
// export const createInputAction = data => createInput(data);
// export const createOutputAction = data => createOutput(data);
// export const setAndFetchProjectAction = data => setAndFetchProject(data);
