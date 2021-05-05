import React from 'react'
import { Link } from 'react-router-dom'

export const MyAccountActions = () => {
    return (
        <div className="d-flex">
            <Link to="/ajouter-experience" className="btn btn-primary">+ expérience</Link>
            <Link to="/editer-profil" className="btn btn-outline-primary">Éditer mon profil</Link>
            <Link to="/ajouter-diplome" className="btn btn-primary">+ diplome</Link>
        </div>
    )
}
