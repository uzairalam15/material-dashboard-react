import { SET_MESSAGE, UNSET_MESSAGE } from "constants/ProjectTypes";
import initialState from "../store/initialState";

export default function notificationReducer(
  state = initialState.notificationReducer,
  action
) {
  switch (action.type) {
    case SET_MESSAGE:
      return Object.assign({}, state, {
        color: action.data.color,
        message: action.data.message
      });

    case UNSET_MESSAGE:
      return Object.assign({}, state, initialState.notificationReducer);

    default:
      return state;
  }
}
