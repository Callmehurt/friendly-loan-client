import { GroupActionTypes } from "../types";

export const fetchUserGroup = (groups) => {
    return {
        type: GroupActionTypes.FETCH_USER_GROUPS,
        payload: groups
    }
}

export const setCurrentGroup = (group) => {
    return {
        type: GroupActionTypes.SET_CURRENT_GROUP,
        payload: group
    }
}

export const setGroupMembers = (members) => {
    return {
        type: GroupActionTypes.SET_GROUP_MEMBERS,
        payload: members
    }
}