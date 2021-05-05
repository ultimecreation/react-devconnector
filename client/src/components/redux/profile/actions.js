import axios from "axios";
import { setAlert } from "../alert/actions";
import {
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFIL_EXPERIENCE,
    UPDATE_PROFIL_EDUCATION,
    GET_PROFILES,
    GET_REPOS,
    CLEAR_PROFILE,
    DELETE_ACCOUNT
} from "./types";

export const getCurrentProfile = () => async (dispatch) => {
    try {
        const res = await axios.get(
            "http://localhost:3001/api/profils/mon-profil"
        );

        dispatch({
            type: GET_PROFILE,
            payload: res.data.profile,
        });
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status,
            },
        });
    }
};

export const getProfiles = () => async (dispatch) => {
    dispatch({ type: CLEAR_PROFILE  })
    try {
        const res = await axios.get(
            "http://localhost:3001/api/profils"
        );

        dispatch({
            type: GET_PROFILES,
            payload: res.data.profiles,
        });
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status,
            },
        });
    }
};

export const getProfileById = (userId) => async (dispatch) => {
    
    try {
        const res = await axios.get(
            `http://localhost:3001/api/profils/utilisateur/${userId}`
        );

        dispatch({
            type: GET_PROFILE,
            payload: res.data.profile,
        });
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status,
            },
        });
    }
};

export const getGithubRepos = (githubUsername) => async (dispatch) => {
   
    try {
        const res = await axios.get(
            `http://localhost:3001/api/profile/github/${githubUsername}`
        );

        dispatch({
            type: GET_REPOS,
            payload: res.data.repos,
        });
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status,
            },
        });
    }
};

export const createProfile = (formData, history) => async (dispatch) => {
    console.log("ok");
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const res = await axios.post(
            "http://localhost:3001/api/profils/creer",
            formData,
            config
        );

        dispatch({
            type: GET_PROFILE,
            payload: res.data.profile,
        });

        dispatch(setAlert("success", "profil créer"));

        history.push("mon-compte");
    } catch (err) {
        const errors = err.response.data.errors.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert("danger", error.msg)));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

export const updateProfile = (formData, history) => async (dispatch) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const res = await axios.put(
            "http://localhost:3001/api/profils/modifier",
            formData,
            config
        );

        dispatch({
            type: GET_PROFILE,
            payload: res.data.profile,
        });

        dispatch(setAlert("success", "profil mis à jour"));

        history.push("mon-compte");
    } catch (err) {
        const errors = err.response.data.errors.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert("danger", error.msg)));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

export const updateExperience = (formData, history) => async (dispatch) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const res = await axios.put(
            "http://localhost:3001/api/profils/experience/modifier",
            formData,
            config
        );

        dispatch({
            type: UPDATE_PROFIL_EXPERIENCE,
            payload: res.data.profile,
        });

        dispatch(setAlert("success", "experience ajoutée"));
        history.push("mon-compte");
    } catch (err) {
        const errors = err.response.data.errors.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert("danger", error.msg)));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

export const updateEducation = (formData, history) => async (dispatch) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const res = await axios.put(
            "http://localhost:3001/api/profils/education/modifier",
            formData,
            config
        );

        dispatch({
            type: UPDATE_PROFIL_EDUCATION,
            payload: res.data.profile,
        });

        dispatch(setAlert("success", "diplome ajoutée"));
        history.push("mon-compte");
    } catch (err) {
        const errors = err.response.data.errors.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert("danger", error.msg)));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

export const deleteExperience = (expId) => async (dispatch) => {
    try {
        const res = await axios.delete(
            `http://localhost:3001/api/profils/experience/supprimer/${expId}`
        );
        dispatch({
            type: UPDATE_PROFIL_EXPERIENCE,
            payload: res.data.profile,
        });
        dispatch(setAlert("success", "expérience supprimée"));
    } catch (err) {
        const errors = err.response.data.errors.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert("danger", error.msg)));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

export const deleteEducation = (eduId) => async (dispatch) => {
    try {
        const res = await axios.delete(
            `http://localhost:3001/api/profils/education/supprimer/${eduId}`
        );
        dispatch({
            type: UPDATE_PROFIL_EDUCATION,
            payload: res.data.profile,
        });
        dispatch(setAlert("success", "diplome supprimé"));
    } catch (err) {
        const errors = err.response.data.errors.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert("danger", error.msg)));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

export const deleteAccount = () => async (dispatch) => {
    if (window.confirm("La suppression de votre compte est irréversible")) {
        try {
             await axios.delete(
                `http://localhost:3001/api/profils/supprimer`
            );
            dispatch({type: CLEAR_PROFILE});
            dispatch({type: DELETE_ACCOUNT});
            dispatch(setAlert("success", "Compte supprimé"));
        } catch (err) {
            const errors = err.response.data.errors.errors;

            if (errors) {
                errors.forEach((error) =>
                    dispatch(setAlert("danger", error.msg))
                );
            }
            dispatch({
                type: PROFILE_ERROR,
                payload: {
                    msg: err.response.statusText,
                    status: err.response.status,
                },
            });
        }
    }
};
