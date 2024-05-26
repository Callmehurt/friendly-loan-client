import { combineReducers } from "redux";
import { authReducer } from "./authReducer";

const rootReducers = combineReducers({
    authentication: authReducer
});

export default rootReducers