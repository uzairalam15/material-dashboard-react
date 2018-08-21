import { UNSET_MESSAGE, SET_MESSAGE } from "constants/ProjectTypes";

export const unsetMessage = () => ({
  type: UNSET_MESSAGE
});

export const setMessage = data => ({
  type: SET_MESSAGE,
  data
});

export const clearItem = () => ({
  type: "CLEAR_ITEM"
});

export const clearProject = () => ({
  type: "CLEAR_PROJECT"
});

export const clearOutput = () => ({
  type: "CLEAR_OUTPUT"
});

export const clearCause = () => ({
  type: "CLEAR_CAUSE"
});

export const clearMode = () => ({
  type: "CLEAR_MODE"
});
