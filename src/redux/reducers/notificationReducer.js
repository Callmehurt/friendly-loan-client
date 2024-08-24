import { NotificationTypes } from '../types';

const initialState = {
    notifications: []
};


export const notificationReducer = (state = initialState, {type, payload}) => {
    switch(type){
        case NotificationTypes.FETCH_NOTIFICATIONS:
            return {...state, notifications: payload}
        default:
            return state;    
    }
}