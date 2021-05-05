import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {getPost,deleteComment} from '../redux/post/actions'
import Spinner from '../layout/Spinner'
import {Link} from 'react-router-dom'
import Moment from 'react-moment'
import CommentForm from './CommentForm'
import {FaTrashAlt} from 'react-icons/fa'
const Post = ({getPost,loading,match,post,authUser,userLoading,deleteComment}) => {
    const postId = match.params.post_id
    useEffect(()=>{
        getPost(postId)
    },[getPost,postId])
    return (
        <div className="row ">
        {loading || userLoading || post === null ? (
            <Spinner />
        ) : (
            <>
               <div className="col-9 mx-auto">
                   <Link to="/articles" className="text-primary">&lt;&lt; Retour aux articles</Link>
                   <h1>Article</h1>
                  
                   {!loading && <div className=" p-2 my-3" key={post._id}>
                           <div className="d-md-flex">
                                <figure className="w-50 w-md-25 mx-auto text-center">
                                   <img src={post.avatar ===null ?'loading':post.avatar} alt={post.name} className="img-fluid w-100 rounded-circle"/>
                                    <figcaption className="mx-1">
                                        <Link to={`/profil/${post.user}`} className="text-info font-weight-bold" >{post.name} </Link>
                                    </figcaption>
                                </figure>
                               
                               <p className="w-md-75 ml-3">{post.text} </p>
                           </div>
                           <div className="d-flex justify-content-between align-items-center">
                               <div>
                                   Publié le: <Moment format="DD/MM/YYYY">{post.date}</Moment>
                               </div>
                               
                           </div>
                       </div>
                   }
                   
                   <CommentForm postId={postId}/>
                   <h2 className="my-3">Commentaires</h2>
                   {post.comments.map(comment =>{
                       return <div key={comment._id} className="card d-flex flex-row">
                            <figure className="w-25 text-center">
                                <img src={comment.avatar} alt={comment.name} className="img-fluid rounded-circle"/>
                               
                            </figure>
                            <div className="w-75 d-flex justify-content-between">
                                
                                <div className="ml-3">
                                <Link to={`/profils/${comment.user}`}>{comment.name} a dit: </Link>
                                <p >{comment.text} </p>
                                </div>
                                {authUser._id === comment.user && 
                                    <button 
                                        className="btn btn-danger btn-sm "
                                        onClick={(e)=>deleteComment(postId,comment._id)}>
                                        <FaTrashAlt/>
                                    </button>
                                }
                            </div>
                       </div>
                   })}
               </div>
            </>
        )}
    </div>
    )
}

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object,
    authUser: PropTypes.object,
}
const mapStateToProps = state=>({
    post: state.postReducer.post,
    loading: state.postReducer.loading,
    authUser: state.authReducer.user,
    userLoading: state.authReducer.loading
})
export default connect(mapStateToProps,{getPost,deleteComment})(Post)
