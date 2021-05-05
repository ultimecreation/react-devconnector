import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {addComment} from '../redux/post/actions'
const CommentForm = ({addComment,postId}) => {
    const [text,setText] = useState('')

    const onSubmit = e =>{
        e.preventDefault()
        addComment(postId,{text})
        setText('')
    }
    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="text">Laisser un commentaire</label>
                <textarea 
                    name="text"
                    value={text}
                    id="text" 
                    cols="30" 
                    rows=""
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
    )
}

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired,
}

export default connect(null,{addComment})(CommentForm)
