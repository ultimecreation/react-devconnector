import { REMOVE_ALERT, SET_ALERT } from "./types";

const initialState = [];

const alertReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ALERT:
            console.log(action)
            return [ ...state,action.payload ];
        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== action.payload)
        default:
            return state;
    }
};
export default alertReducer;