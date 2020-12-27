import axios from 'axios'
import * as actionType from "./types";
import {setAlert} from "./alert";
import setAuthToken from "../utils/setAuthToken";

export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }

    try {
        const res = await axios.get('/api/auth')
        dispatch({
            type: actionType.USER_LOADED,
            payload: res.data
        })
    } catch (e) {
        dispatch({
            type: actionType.AUTH_ERROR,
        })
    }
}

export const register = ({name, email, password}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({name, email, password})

    try {
        const res = await axios.post('/api/users', body, config)
        dispatch({
            type: actionType.REGISTER_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser())
    } catch (e) {
        const errors = e.response.data.errors
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: actionType.REGISTER_FAIL,
        })
    }
}

export const login = ({email, password}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({email, password})

    try {
        const res = await axios.post('/api/auth', body, config)
        dispatch({
            type: actionType.LOGIN_SUCCESS,
            payload: res.data
        })

        dispatch(loadUser())
    } catch (e) {
        const errors = e.response.data.errors
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: actionType.LOGIN_FAIL,
        })
        console.log(e.response)
    }
}

export const logout = () => dispatch => {
    dispatch({type: actionType.CLEAR_PROFILE})
    dispatch({type: actionType.LOGOUT})
}
