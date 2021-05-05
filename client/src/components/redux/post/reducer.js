
import { DELETE_POST, GET_POSTS,POST_ERROR, UPDATE_LIKES,ADD_POST } from "./types"

const initialState = {
    posts: [],
    post: null,
    loading: true,
    error: {}
}

const postReducer = (state=initialState,action) =>{
    switch(action.type){
        case GET_POSTS:
            return {
                ...state,
                posts: action.payload,
                loading:false
            }
        case POST_ERROR:
            return {
                ...state,
                error:action.payload,
                loading:false
            }
        case ADD_POST:
        return {
            ...state,
            posts: [action.payload.post,...state.posts],
            loading:false
        }
        case DELETE_POST:
        console.log(action)
        return {
            ...state,
            posts: state.posts.filter( post => post._id !== action.payload.post_id),
            loading:false
        }
        case UPDATE_LIKES:
            return {
                ...state,
                posts: state.posts.map(
                    post => post._id === action.payload.post_id
                    ?   {...post,likes: action.payload.likes}
                    :   post
                )
            }
        default:
        return state 
    }
}

export default postReducer