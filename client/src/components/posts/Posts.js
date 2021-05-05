import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPosts,addLike,removeLike,deletePost } from '../redux/post/actions'
import Spinner from '../layout/Spinner'
import { Link } from 'react-router-dom'
import {FaThumbsUp,FaThumbsDown,FaTrashAlt} from 'react-icons/fa'
import Moment from 'react-moment'

const Posts = ({getPosts,loading,posts,currentUser,addLike,removeLike,deletePost}) => {
    useEffect(()=>{
        getPosts()
    },[getPosts])
    return (
        <div className="row ">
            {loading || posts === null ? (
                <Spinner />
            ) : (
                <>
                   <div className="col-12">
                       <h1>Articles</h1>
                       
                       {!posts.loading && posts.map(post =>{
                           return <div className=" p-2 my-3" key={post._id}>
                               <div className="d-md-flex">
                                    <figure className="w-50 w-md-25 mx-auto text-center">
                                       <img src={post.avatar ===null ?'loading':post.avatar} alt={post.name} className="img-fluid w-100 "/>
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
                                    <div>
                                        <button 
                                            className="btn btn-outline-info btn-sm mx-1 px-3" 
                                            onClick={e =>addLike(post._id)}><FaThumbsUp/>
                                            {' '+post.likes.length} 
                                            </button>
                                        <button 
                                            className="btn btn-outline-info btn-sm mx-1 px-3" 
                                            onClick={e=> removeLike(post._id)}><FaThumbsDown/>
                                        </button>
                                        <Link to={`/articles/${post._id}`} className="btn btn-info btn-sm">Commentaires </Link>
                                       {
                                            !loading && (currentUser._id === post.user) &&  
                                            <button 
                                                className="btn btn-danger btn-sm mx-1 px-3"
                                                onClick={e => deletePost(post._id)}
                                                ><FaTrashAlt/> 
                                            </button>
                                        }
                                    </div>
                               </div>
                           </div>
                       })}
                   </div>
                </>
            )}
        </div>
    )
}

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
}
const mapStateToProps = state =>( {
    posts: state.postReducer.posts,
    loading: state.authReducer.loading,
    currentUser: state.authReducer.user
})

export default connect(mapStateToProps,{getPosts,addLike,removeLike,deletePost})(Posts)
