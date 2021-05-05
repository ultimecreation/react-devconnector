import axios from "axios";
import setAuthToken from "../../../utils/setAuthToken";
import { setAlert } from "../alert/actions";
import {
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    AUTH_ERROR,
    USER_LOADED,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOGOUT,
    CLEAR_PROFILE,
} from "./types";

export const loadUser = ()=> async dispatch =>{
    if(localStorage.token){
        
        setAuthToken(localStorage.token)
    }

    try {
        const res = await axios.get('http://localhost:3001/api/validation-token')
        
        dispatch({type:USER_LOADED,payload:res.data})

    } catch (error) {
        dispatch({type:AUTH_ERROR})
    }
}

export const registerUser = (name, email, password, password_confirm) => 
async (dispatch) => {

    const config = {
        headers: { "Content-Type": "application/json" }
    };

    const body = JSON.stringify({ name, email, password, password_confirm});

    try {
        const res = await axios.post("/api/inscription", body, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data,
        });
        dispatch(loadUser())
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert("danger", error.msg)));
        }
        dispatch({ type: REGISTER_FAIL });
    }
};

export const login = (email, password) => {
    return async (dispatch) => {

        const config = {
            headers: { "Content-Type": "application/json", },
        };

        const body = JSON.stringify({ email, password });

        try {
            const res = await axios.post("/api/connexion", body, config);
           
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data,
            });
            dispatch(loadUser())
        } catch (err) {
            const errors = err.response.data.errors;
            console.log(err);
            if (errors) {
                errors.forEach((error) =>
                    dispatch(setAlert("danger", error.msg))
                );
            }
            dispatch({ type: LOGIN_FAIL });
        }
    };
};

export const logout = () =>  dispatch =>{
    dispatch({type: CLEAR_PROFILE})
     dispatch({type: USER_LOGOUT})
    
}