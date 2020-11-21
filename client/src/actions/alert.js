import * as actionType from './types'
import {v4} from 'uuid';

export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
    const id = v4();
    dispatch({
        type: actionType.SET_ALERT,
        payload: {msg, alertType, id}
    })

    setTimeout(() => dispatch({
        type: actionType.REMOVE_ALERT,
        payload: id
    }), timeout)
}