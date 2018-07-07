import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import projectReducer from "./projectReducer";
import projectDetailReducer from "./projectDetailReducer";
const rootReducer = combineReducers({
  projectDetailReducer,
  projectReducer,
  routing: routerReducer
});

export default rootReducer;
