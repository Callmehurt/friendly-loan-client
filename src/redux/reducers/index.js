import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { groupReducer } from "./groupReducer";
import { notificationReducer } from "./notificationReducer";

const rootReducers = combineReducers({
    authentication: authReducer,
    group: groupReducer,
    notifications: notificationReducer
});

export default rootReducers