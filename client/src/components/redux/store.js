import { applyMiddleware, createStore,combineReducers } from "redux";
import thunk  from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import alertReducer from "./alert/reducer";
import authReducer from './auth/reducer'
import profileReducer from './profile/reducer'
import postReducer from './post/reducer'

const initialState = {}
const middlewares =[thunk]
const store = createStore(
    combineReducers({
        alertReducer,
        authReducer,
        profileReducer,
        postReducer
    }),
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
)

export default store