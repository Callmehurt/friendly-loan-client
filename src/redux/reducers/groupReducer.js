import { GroupActionTypes } from "../types";

const initialState = {
    userGroups: []
};


export const groupReducer = (state = initialState, {type, payload}) => {
    switch(type){
        case GroupActionTypes.FETCH_USER_GROUPS:
            return {...state, userGroups: payload}
        default:
            return state;    
    }
}