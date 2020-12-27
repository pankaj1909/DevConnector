import axios from 'axios'
import * as actionType from "./types";
import {setAlert} from "./alert";


export const getPosts = () => async dispatch => {

    try {
        const res = await axios.get('/api/posts')
        dispatch({
            type: actionType.GET_POSTS,
            payload: res.data
        })
    } catch (e) {
        dispatch({
            type: actionType.POST_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
}

export const getPost = (id) => async dispatch => {

    try {
        const res = await axios.get(`/api/posts/${id}`)
        dispatch({
            type: actionType.GET_POST,
            payload: res.data
        })
    } catch (e) {
        dispatch({
            type: actionType.POST_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
}

export const addLike = (postId) => async dispatch => {

    try {
        const res = await axios.put(`/api/posts/like/${postId}`)
        dispatch({
            type: actionType.UPDATE_LIKES,
            payload: {likes: res.data, postId}
        })
    } catch (e) {
        dispatch({
            type: actionType.POST_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
}

export const removeLike = (postId) => async dispatch => {

    try {
        const res = await axios.put(`/api/posts/unlike/${postId}`)
        dispatch({
            type: actionType.UPDATE_LIKES,
            payload: {likes: res.data, postId}
        })
    } catch (e) {
        dispatch({
            type: actionType.POST_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
}

export const deletePost = (postId) => async dispatch => {

    try {
        const res = await axios.delete(`/api/posts/${postId}`)
        dispatch({
            type: actionType.DELETE_POST,
            payload: postId
        })

        dispatch(setAlert('Post Removed', 'success'))
    } catch (e) {
        dispatch({
            type: actionType.POST_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
}

export const addPost = (formData) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.post(`/api/posts`, formData, config)
        dispatch({
            type: actionType.ADD_POST,
            payload: res.data
        })

        dispatch(setAlert('Post Created', 'success'))
    } catch (e) {
        dispatch({
            type: actionType.POST_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
}

export const addComment = (postId, formData) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.post(`/api/posts/comment/${postId}`, formData, config)
        dispatch({
            type: actionType.ADD_COMMENT,
            payload: res.data
        })

        dispatch(setAlert('Comment Added', 'success'))
    } catch (e) {
        dispatch({
            type: actionType.POST_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
}

export const removeComment = (postId, commentId) => async dispatch => {

    try {
        const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`)
        dispatch({
            type: actionType.REMOVE_COMMENT,
            payload: commentId
        })

        dispatch(setAlert('Comment Removed', 'success'))
    } catch (e) {
        dispatch({
            type: actionType.POST_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
}
