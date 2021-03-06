import * as actionType from "../actions/types";

const initialState = {
    post: null,
    posts: [],
    loading: true,
    error: {}
}

export default function (state = initialState, action) {
    const {type, payload} = action
    switch (type) {
        case actionType.ADD_POST:
            return {
                ...state,
                posts: [payload, ...state.posts],
                loading: false,
                error: {}
            };
        case actionType.GET_POSTS:
            return {
                ...state,
                posts: payload,
                loading: false,
                error: {}
            };
        case actionType.GET_POST:
            return {
                ...state,
                post: payload,
                loading: false,
                error: {}
            };
        case actionType.UPDATE_LIKES:
            return {
                ...state,
                posts: state.posts.map(post => post._id === payload.postId ?
                    {...post, likes: payload.likes} : post),
                loading: false,
            };
        case actionType.DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== payload),
                loading: false,
            };
        case actionType.ADD_COMMENT:
            return {
                ...state,
                post: {...state.post, comments: payload},
                loading: false,
                error: {}
            };
        case actionType.REMOVE_COMMENT:
            return {
                ...state,
                post: {
                    ...state.post,
                    comments: state.post.comments.filter(comment => comment._id !== payload)
                },
                loading: false,
                error: {}
            };
        case actionType.POST_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
            };
        default:
            return state
    }
}