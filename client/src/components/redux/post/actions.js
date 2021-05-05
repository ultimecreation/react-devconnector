import axios from "axios"
import { setAlert } from "../alert/actions"
import { DELETE_POST, GET_POSTS, POST_ERROR,UPDATE_LIKES,ADD_POST } from "./types"

export const getPosts = ()=> async dispatch =>{
    try {
        const res = await axios.get("http://localhost:3001/api/articles/liste")
        
        dispatch({type: GET_POSTS,payload:res.data.posts})
    } catch (err) {
       
        dispatch({
            type:POST_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        })
    }
}

export const addLike = (post_id) => async dispatch  =>{
   try {
    const res = await axios.put(`http://localhost:3001/api/articles/likes/${post_id}`)

    dispatch({ 
        type: UPDATE_LIKES,
        payload: { post_id, likes: res.data.likes}
    })

   } catch (err) {
    
    dispatch({
        type:POST_ERROR,
        payload: {
            msg: err.response.statusText,
            status: err.response.status,
        },
    })
   }
}

export const removeLike = (post_id) => async dispatch  =>{
    try {
     const res = await axios.delete(`http://localhost:3001/api/articles/likes/${post_id}`)
 
     dispatch({ 
         type: UPDATE_LIKES,
         payload: { post_id, likes: res.data.likes}
     })
 
    } catch (err) {
     
     dispatch({
         type:POST_ERROR,
         payload: {msg: err.response.statusText, status: err.response.statusCode}
     })
    }
 }

 export const deletePost = (post_id) => async dispatch  =>{
    try {
     await axios.delete(`http://localhost:3001/api/articles/supprimer/${post_id}`)
 
     dispatch({ 
         type: DELETE_POST,
         payload: { post_id}
     })
     dispatch(setAlert("success","article supprimé"))

    } catch (err) {
     
     dispatch({
         type:POST_ERROR,
         payload: {msg: err.response.statusText, status: err.response.statusCode}
     })
    }
 }

 export const addPost = (text) => async dispatch  =>{
     const config = {
         headers:{
             'Content-Type':'application/json'
         }
     }
   
     await axios.post(`http://localhost:3001/api/articles/creer`,text,config).then(res=>{
             dispatch({ 
                type: ADD_POST,
                payload: res.data.post
            })
             dispatch(setAlert("success","article créé"))
        }).catch(err => {
            console.log(err)
             dispatch({
                type:POST_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status },
        })
     })
     
 }