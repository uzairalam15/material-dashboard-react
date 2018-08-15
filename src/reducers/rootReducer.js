import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import projectReducer from "./projectReducer";
import notificationReducer from "./notificationReducer";
import projectDetailReducer from "./projectDetailReducer";
const rootReducer = combineReducers({
  projectDetailReducer,
  notificationReducer,
  projectReducer,
  routing: routerReducer
});

export default rootReducer;
