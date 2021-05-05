import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'
import {logout} from '../redux/auth/actions'
const Navbar = ({isAuthenticated,logout,loading}) => {
    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-primary fixed-top">
            <div className="container">
            <Link className="navbar-brand" to="/">
              <img src={`${process.env.PUBLIC_URL}/img/icon.jpg`} alt=""/> DevConnect
            </Link>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        
                        <Link className="nav-link" to="/profils">
                           Développeurs
                        </Link>
                    </li>
                    {!loading && isAuthenticated  
                    ? <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/articles">
                                Articles
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/articles/creer">
                                Créer article
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link onClick={logout} to="/"  className="nav-link">
                                Déconnexion
                            </Link>
                        </li>
                        
                        <li className="nav-item">
                            <Link className="nav-link" to="/mon-compte">
                                Mon compte
                            </Link>
                        </li>
                    </>
                    : <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/inscription">
                                Inscription
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/connexion">
                                Connexion
                            </Link>
                        </li>
                    </>
                    }
                </ul>
            </div>
            </div>
        </nav>
    );
};

Navbar.propTypes = {
    isAuthenticated: PropTypes.bool,
}
const mapStateToProps = state => ({
    isAuthenticated: state.authReducer.isAuthenticated,
    loading: state.authReducer.loading
})
export default connect(mapStateToProps,{logout})(Navbar);
