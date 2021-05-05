import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {addPost} from '../redux/post/actions'
import { withRouter } from 'react-router'
const PostForm = ({addPost,history}) => {

    const [text,setText] = useState('')
   

    const onSubmit = e =>{
        e.preventDefault()
        addPost({text},history)
        setText('')
    }
    return (
        <div>
            <h1>Créer un article</h1>
            <div className="col-9 mx-auto">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Contenu</label>
                        <textarea 
                            name="text"
                            value={text}
                            id="text" 
                            cols="30" 
                            rows="5"
                            className="form-control"
                            onChange={e =>setText(e.target.value)}>
                        </textarea>
                    </div>

                    
                    <input
                        type="submit"
                        value="Soumettre"
                        className="btn btn-primary btn-block mt-3 "
                    />
                   
                </form>
            </div>
        </div>
    )
}

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired,
}

export default connect(null,{addPost})(withRouter(PostForm))
