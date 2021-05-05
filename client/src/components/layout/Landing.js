import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import PropTypes from 'prop-types'

const Landing = ({isAuthenticated}) => {
    if(isAuthenticated) return <Redirect to="mon-compte"/>
    return (
        <div className="landing">
            <div className="dark-overlay"></div>
            <div className="landing-text text-white">
                <h1 className=" font-weight-bold">
                    Créez votre profil <br />
                    partagez des articles avec vos pairs
                </h1>
                <div className="d-flex mt-5">
                    <Link to="/inscription" className="btn btn-primary text-light font-weight-bold text-uppercase p-3">Inscription</Link>
                    <Link to="/connexion" className="btn bg-light btn-outline-primary font-weight-bold text-uppercase ml-3 p-3">connexion</Link>
                </div>
            </div>
        </div>
    );
};
Landing.propTypes = {
    isAuthenticated: PropTypes.bool,
}
const mapStateToProps =state=>({
    isAuthenticated: state.authReducer.isAuthenticated
})
export default connect(mapStateToProps)(Landing);
