import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import projectReducer from "./projectReducer";
import programReducer from "./programReducer";
import notificationReducer from "./notificationReducer";
import projectDetailReducer from "./projectDetailReducer";
import projectAnalysisReducer from "./projectAnalysisReducer";
const rootReducer = combineReducers({
  projectDetailReducer,
  notificationReducer,
  projectReducer,
  programReducer,
  projectAnalysisReducer,
  routing: routerReducer
});

export default rootReducer;
