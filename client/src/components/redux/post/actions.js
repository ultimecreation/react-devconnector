import axios from "axios"
import { setAlert } from "../alert/actions"
import { DELETE_POST, GET_POSTS, POST_ERROR,UPDATE_LIKES,ADD_POST,GET_POST,ADD_COMMENT,REMOVE_COMMENT } from "./types"

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
export const getPost = (post_id)=> async dispatch =>{
    try {
        const res = await axios.get(`http://localhost:3001/api/articles/${post_id}`)
       
        dispatch({type: GET_POST,payload:res.data.post})
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

 export const addPost = (text,history) => async dispatch  =>{
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
             history.push("/articles")
        }).catch(err => {
            console.log(err)
             dispatch({
                type:POST_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status },
        })
     })
     
 }

 export const addComment = (postId,formData) => async dispatch  =>{
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
  
    await axios.put(`http://localhost:3001/api/articles/commentaires/ajouter/${postId}`,formData,config)
        .then(res=>{
            dispatch({ 
               type: ADD_COMMENT,
               payload: res.data.comments
           })
            dispatch(setAlert("success","commentaire sauvegardé"))
            
       }).catch(err => {
           console.log(err)
            dispatch({
               type:POST_ERROR,
               payload: { msg: err.response.statusText, status: err.response.status },
       })
    })
    
}

export const deleteComment = (postId,commentId) => async dispatch  =>{
  
    await axios.delete(`http://localhost:3001/api/articles/commentaires/supprimer/${postId}/commentaire/${commentId}`)
        .then(res=>{
            console.log(res.data.comments)
            dispatch({ 
               type: REMOVE_COMMENT,
               payload: res.data.comments
           })
            dispatch(setAlert("success","commentaire supprimé"))
            
       }).catch(err => {
           console.log(err)
            dispatch({
               type:POST_ERROR,
               payload: { msg: err.response.statusText, status: err.response.status },
       })
    })
    
}