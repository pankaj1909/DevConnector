import * as actionType from "../actions/types";

const initialState = {
    token: localStorage.getItem('token'),
    isAutheticated: null,
    loading: true,
    user: null
}

export default function (state = initialState, action) {
    const {type, payload} = action
    switch (type) {
        case actionType.REGISTER_SUCCESS:
            localStorage.setItem('token', payload.token)
            return {
                ...state,
                ...payload,
                isAutheticated: true,
                loading: false
            };
        case actionType.LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token)
            return {
                ...state,
                ...payload,
                isAutheticated: true,
                loading: false
            };
        case actionType.REGISTER_FAIL:
        case actionType.LOGIN_FAIL:
        case actionType.AUTH_ERROR:
        case actionType.LOGOUT:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAutheticated: false,
                loading: false
            };
        case actionType.USER_LOADED:
            return {
                ...state,
                isAutheticated: true,
                loading: false,
                user: payload
            }
        default:
            return state
    }
}