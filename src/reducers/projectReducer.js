import {
  GET_PROJECTS_SUCCESS,
  ADD_PROJECT_SUCCESS,
  UPDATE_PROJECT_SUCCESS,
  ADD_SUB_PROJECT_SUCCESS,
  UPDATE_SUB_PROJECT_SUCCESS,
  GET_SUB_PROJECTS_SUCCESS,
  ADD_SUB_PROJECTS_SUCCESS
} from "constants/ProjectTypes";
import initialState from "../store/initialState";
import {
  getIndexAndObjectofId,
  editItemAtIndex,
  getObjectOfId,
  getIndexOfId
} from "utils/helpers";

function addSubProject(projects, newSubProject, projectId) {
  const { object, index } = getIndexAndObjectofId(projects, projectId);
  object.subProjects = [newSubProject, ...object.subProjects];
  return editItemAtIndex(projects, object, index);
}

function updateSubProject(projects, updatedSubProject, projectId) {
  const { object, index } = getIndexAndObjectofId(projects, projectId);
  const subProjectIndex = getIndexOfId(
    object.subProjects,
    updatedSubProject.id
  );
  object.subProjects = editItemAtIndex(
    object.subProjects,
    updatedSubProject,
    subProjectIndex
  );
  return editItemAtIndex(projects, object, index);
}

function updateProject(projects, updatedProject) {
  const { object, index } = getIndexAndObjectofId(projects, updatedProject.id);
  return editItemAtIndex(projects, updatedProject, index);
}

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

    case ADD_PROJECT_SUCCESS:
      return Object.assign({}, state, {
        projects: [action.data, ...state.projects]
      });

    case ADD_SUB_PROJECT_SUCCESS:
      return Object.assign({}, state, {
        projects: addSubProject(state.projects, action.data, action.id)
      });

    case UPDATE_PROJECT_SUCCESS:
      return Object.assign({}, state, {
        projects: updateProject(state.projects, action.data)
      });

    case UPDATE_SUB_PROJECT_SUCCESS:
      return Object.assign({}, state, {
        projects: updateSubProject(state.projects, action.data, action.id)
      });

    default:
      return state;
  }
}
