import { GET_PROFILE, GET_PROFILES, PROFILE_ERROR, UPDATE_PROFIL_EDUCATION, UPDATE_PROFIL_EXPERIENCE ,GET_REPOS,CLEAR_PROFILE,} from "./types"


const initialState = {
    profile: null,
    profiles: [],
    repos:[],
    loading: true,
    error:{}
}
export const profileReducer = (state=initialState,action)=>{
    switch(action.type){
        case GET_PROFILE:
        case UPDATE_PROFIL_EXPERIENCE:
        case UPDATE_PROFIL_EDUCATION:
            return {
                ...state,
                profile: action.payload,
                loading: false 
            }
       case GET_PROFILES:
       return {
           ...state,
           profiles:action.payload,
           loading:false
       }
        case PROFILE_ERROR:
            return {
                ...state,
                error:action.payload,
                loading:false,
                profile:null
            }
        case CLEAR_PROFILE:
            return{
                ...state,
                profile:null,
                repos:[],
                loading:false
            }
        case GET_REPOS:
        return {
            ...state,
            loading:false,
            repos:action.payload
        }
        default:
            return state
    }
}

export default profileReducer