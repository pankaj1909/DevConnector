import * as actionType from "../actions/types";

const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {}
}

export default function (state = initialState, action) {
    const {type, payload} = action
    switch (type) {
        case actionType.UPDATE_PROFILE:
        case actionType.GET_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false,
                error: {}
            };
        case actionType.GET_PROFILES:
            return {
                ...state,
                profiles: payload,
                loading: false,
                error: {}
            };
        case actionType.GET_REPOS:
            return {
                ...state,
                repos: payload,
                loading: false,
                error: {}
            };
        case actionType.PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
            };
        case actionType.CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                repos: [],
                loading: false,
                error: {}
            };
        default:
            return state
    }
}