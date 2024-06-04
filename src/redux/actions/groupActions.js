import { GroupActionTypes } from "../types";

export const fetchUserGroup = (groups) => {
    return {
        type: GroupActionTypes.FETCH_USER_GROUPS,
        payload: groups
    }
}