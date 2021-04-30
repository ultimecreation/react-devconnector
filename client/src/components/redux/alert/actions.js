import * as uuid from "uuid";
import { REMOVE_ALERT, SET_ALERT } from "./types";

export const setAlert = (alertType,message,timer=5000)=>{
    return dispatch  =>{

        const id = uuid.v4()
        dispatch({
            type: SET_ALERT,
            payload: {id,alertType,message}
        })
        setTimeout(()=>dispatch({type:REMOVE_ALERT, payload:id}),timer)
    }
}
