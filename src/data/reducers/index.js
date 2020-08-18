import { combineReducers } from "redux";
import userReducer from "./user";
import uiReducer from "./ui";
import resourcesReducer from "./resources";

const appReducer = combineReducers({
  user: userReducer,
  ui: uiReducer,
  resources: resourcesReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    return {
      ui: {},
      user: {},
      resources: {},
    };
  }
  return appReducer(state, action);
};

export default rootReducer;
