import {
  GET_SAFETY_REQUIREMENTS_SUCCESS,
  ADD_SAFETY_REQUIREMENT_SUCCESS,
  UPDATE_SAFETY_REQUIREMENT_SUCCESS,
  DELETE_SAFETY_REQUIREMENT_SUCCESS,
  SET_SELECTED_SAFETY_REQUIREMENT
} from "constants/SafetyRequirementTypes";
import {
  getSafetyRequirements,
  createSafetyRequirement,
  updateSafetyRequirement,
  deleteSafetyRequirement
} from "sources/SafetyRequirementSource";

export const getSafetyRequirementsSuccess = data => ({
  type: GET_SAFETY_REQUIREMENTS_SUCCESS,
  data
});

export const addSafetyRequirementSuccess = data => ({
  type: ADD_SAFETY_REQUIREMENT_SUCCESS,
  data
});

export const deleteSafetyRequirementSuccess = id => ({
  type: DELETE_SAFETY_REQUIREMENT_SUCCESS,
  id
});

export const setSelectedSafetyRequirement = id => ({
  type: SET_SELECTED_SAFETY_REQUIREMENT,
  id
});

export const updateSafetyRequirementSuccess = data => ({
  type: UPDATE_SAFETY_REQUIREMENT_SUCCESS,
  data
});

export const getSafetyRequirementsAction = id => getSafetyRequirements(id);
export const createSafetyRequirementAction = data =>
  createSafetyRequirement(data);
export const updateSafetyRequirementAction = (data, id) =>
  updateSafetyRequirement(data, id);
export const deleteSafetyRequirementAction = id => deleteSafetyRequirement(id);
