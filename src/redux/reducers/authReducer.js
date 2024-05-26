import { AuthActionTypes } from "../types"

const initialState = {
    isAuthenticated: false,
    user: {},
    accessToken: ''
}


export const authReducer = (state = initialState, {type, payload}) => {
    switch(type){
        case AuthActionTypes.AUTHENTICATE_USER:
            return {...state, isAuthenticated: true, user: payload.user, accessToken: payload.token}
        case AuthActionTypes.UPDATE_TOKEN:
            return {...state, isAuthenticated: true, user: payload.user, accessToken: payload.token}
        case AuthActionTypes.LOGOUT_USER:
            return {...state, isAuthenticated: false, user: {}, accessToken: ''}
        default:
            return state;        
    }
}