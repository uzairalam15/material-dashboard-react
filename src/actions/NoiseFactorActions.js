import {
  GET_NOISE_FACTORS_SUCCESS,
  ADD_NOISE_FACTOR_SUCCESS,
  UPDATE_NOISE_FACTOR_SUCCESS,
  DELETE_NOISE_FACTOR_SUCCESS,
  SET_SELECTED_NOISE_FACTOR
} from "constants/NoiseFactorTypes";
import {
  getNoiseFactors,
  createNoiseFactor,
  updateNoiseFactor,
  deleteNoiseFactor
} from "sources/NoiseFactorSource";

export const getNoiseFactorsSuccess = data => ({
  type: GET_NOISE_FACTORS_SUCCESS,
  data
});

export const addNoiseFactorSuccess = data => ({
  type: ADD_NOISE_FACTOR_SUCCESS,
  data
});

export const deleteNoiseFactorSuccess = id => ({
  type: DELETE_NOISE_FACTOR_SUCCESS,
  id
});

export const setSelectedNoiseFactor = id => ({
  type: SET_SELECTED_NOISE_FACTOR,
  id
});

export const updateNoiseFactorSuccess = data => ({
  type: UPDATE_NOISE_FACTOR_SUCCESS,
  data
});

export const getNoiseFactorsAction = id => getNoiseFactors(id);
export const createNoiseFactorAction = data => createNoiseFactor(data);
export const updateNoiseFactorAction = (data, id) =>
  updateNoiseFactor(data, id);
export const deleteNoiseFactorAction = id => deleteNoiseFactor(id);
