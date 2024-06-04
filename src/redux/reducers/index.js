import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { groupReducer } from "./groupReducer";

const rootReducers = combineReducers({
    authentication: authReducer,
    group: groupReducer
});

export default rootReducers