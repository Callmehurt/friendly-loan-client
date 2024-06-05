import { GroupActionTypes } from "../types";

const initialState = {
    userGroups: [],
    currentGroup: {},
    groupMembers: []
};


export const groupReducer = (state = initialState, {type, payload}) => {
    switch(type){
        case GroupActionTypes.FETCH_USER_GROUPS:
            return {...state, userGroups: payload}
        case GroupActionTypes.SET_CURRENT_GROUP:
            return {...state, currentGroup: payload}    
        case GroupActionTypes.SET_GROUP_MEMBERS:
            return {...state, groupMembers: payload}    
        default:
            return state;    
    }
}