import { AuthActionTypes } from "../types"

export const authenticateUser = ({user, token}) => {
    return {
        type: AuthActionTypes.AUTHENTICATE_USER,
        payload: {
            user,
            token
        }
    }
}

export const updateToken = ({user, accessToken}) => {
    return {
        type: AuthActionTypes.UPDATE_TOKEN,
        payload: {
            user,
            accessToken
        }
    }
}

export const logoutUser = () => {
    return {
        type: AuthActionTypes.LOGOUT_USER,
        payload: {}
    }
}