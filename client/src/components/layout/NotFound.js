import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div>
           <h1>Page inexistante</h1>
           <Link to="/" className="btn btn-primary">Retour</Link>
        </div>
    )
}

export default NotFound
