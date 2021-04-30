import { applyMiddleware, createStore,combineReducers } from "redux";
import thunk  from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import alertReducer from "./alert/reducer";
import authReducer from './auth/reducer'

const initialState = {}
const middlewares =[thunk]
const store = createStore(
    combineReducers({
        alertReducer,
        authReducer
    }),
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
)

export default store