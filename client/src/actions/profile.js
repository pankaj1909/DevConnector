import axios from 'axios'
import * as actionType from "./types";
import {setAlert} from "./alert";

export const getCurrentProfile = () => async dispatch => {

    try {
        const res = await axios.get('/api/profile/me')
        dispatch({
            type: actionType.GET_PROFILE,
            payload: res.data
        })
    } catch (e) {
        dispatch({
            type: actionType.PROFILE_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
}

export const getProfiles = () => async dispatch => {

    dispatch({type: actionType.CLEAR_PROFILE})

    try {
        const res = await axios.get('/api/profile')
        dispatch({
            type: actionType.GET_PROFILES,
            payload: res.data
        })
    } catch (e) {
        dispatch({
            type: actionType.PROFILE_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
}

export const getProfileById = (userId) => async dispatch => {

    try {
        const res = await axios.get(`/api/profile/user/${userId}`)
        dispatch({
            type: actionType.GET_PROFILE,
            payload: res.data
        })
    } catch (e) {
        dispatch({
            type: actionType.PROFILE_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
}

export const getGithubRepo = (userName) => async dispatch => {

    try {
        const res = await axios.get(`/api/profile/github/${userName}`)
        dispatch({
            type: actionType.GET_REPOS,
            payload: res.data
        })
    } catch (e) {
        dispatch({
            type: actionType.PROFILE_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
}

export const createOrUpdateProfile = (formData, history, edit = false) => async dispatch => {

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post('api/profile', formData, config)
        dispatch({
            type: actionType.GET_PROFILE,
            payload: res.data
        })
        dispatch(setAlert(edit ? 'Profile Update' : 'Profile Created', 'success'))
        if (!edit) {
            history.push('/dashboard')
        }
    } catch (e) {
        const errors = e.response.data.errors
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: actionType.PROFILE_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
}

export const addExperience = (formData, history) => async dispatch => {

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put('api/profile/experience', formData, config)
        dispatch({
            type: actionType.UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Experience Added', 'success'))
        history.push('/dashboard')
    } catch (e) {
        const errors = e.response.data.errors
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: actionType.PROFILE_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
}

export const addEducation = (formData, history) => async dispatch => {

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put('api/profile/education', formData, config)
        dispatch({
            type: actionType.UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Education Added', 'success'))
        history.push('/dashboard')
    } catch (e) {
        const errors = e.response.data.errors
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: actionType.PROFILE_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
}

export const deleteExperience = (id) => async dispatch => {

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.delete(`api/profile/experience/${id}`)
        dispatch({
            type: actionType.UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Experience Deleted', 'success'))
    } catch (e) {

        dispatch({
            type: actionType.PROFILE_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
}

export const deleteEducation = (id) => async dispatch => {

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.delete(`api/profile/education/${id}`)
        dispatch({
            type: actionType.UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Education Deleted', 'success'))
    } catch (e) {

        dispatch({
            type: actionType.PROFILE_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
}

export const deleteAccountAndProfile = () => async dispatch => {

    if (window.confirm('Are you sure?')) {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            await axios.delete('api/profile')
            dispatch({type: actionType.CLEAR_PROFILE,})
            dispatch({type: actionType.DELETE_ACCOUNT,})
            dispatch(setAlert('Account Deleted'))
        } catch (e) {
            dispatch({
                type: actionType.PROFILE_ERROR,
                payload: {msg: e.response.statusText, status: e.response.status}
            })
        }
    }


}

