import {
  GET_PROJECTS_SUCCESS,
  ADD_PROJECT_SUCCESS,
  GET_SUB_PROJECTS_SUCCESS,
  ADD_SUB_PROJECTS_SUCCESS
} from "constants/ProjectTypes";
import initialState from "../store/initialState";
import { getIndexAndObjectofId, editItemAtIndex } from "utils/helpers";

function appendSubProjects(projects, subProjects, projectID) {
  const element = getIndexAndObjectofId(projects, projectID);
  const newElement = Object.assign({}, element.object, {
    subProjects,
    subProFetched: true
  });
  return editItemAtIndex(projects, newElement, element.index);
}

export default function projectReducer(
  state = initialState.projectReducer,
  action
) {
  switch (action.type) {
    case GET_PROJECTS_SUCCESS:
      return Object.assign({}, state, {
        projects: action.data
      });

    case GET_SUB_PROJECTS_SUCCESS:
      return Object.assign({}, state, {
        projects: appendSubProjects(state.projects, action.data, action.id)
      });

    default:
      return state;
  }
}
