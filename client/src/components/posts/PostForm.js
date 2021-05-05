import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {addPost} from '../redux/post/actions'
const PostForm = ({addPost}) => {

    const [text,setText] = useState('')
   

    const onSubmit = e =>{
        e.preventDefault()
        addPost({text})
        setText('')
    }
    return <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Partagez une idée</label>
                    <textarea 
                        name="text"
                        value={text}
                        id="text" 
                        cols="30" 
                        rows="2"
                        className="form-control"
                        onChange={e =>setText(e.target.value)}>
                    </textarea>
                </div>

                <input
                    type="submit"
                    value="Envoyer"
                    className="btn btn-primary btn-block mt-3 "
                />  
            </form>
}

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired,
}

export default connect(null,{addPost})(PostForm)
