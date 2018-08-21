import { UNSET_MESSAGE, SET_MESSAGE } from "constants/ProjectTypes";

export const unsetMessage = () => ({
  type: UNSET_MESSAGE
});

export const setMessage = data => ({
  type: SET_MESSAGE,
  data
});
