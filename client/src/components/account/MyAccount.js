import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteAccount, getCurrentProfile } from "../redux/profile/actions";
import Spinner from "../layout/Spinner";
import { Fragment } from "react";
import {FaUserCheck} from 'react-icons/fa'
import { Link } from "react-router-dom";
import { MyAccountActions } from "./MyAccountActions";
import ExperienceList from "./ExperienceList";
import EducationList from "./EducationList";
const MyAccount = ({ getCurrentProfile,auth:{user}, profile,deleteAccount}) => {
    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);

    return profile.loading && profile.profile === null 
    ? (<Spinner />) 
    : (
        <Fragment>
            <h1 className="text-primary">Mon compte</h1>
            <p><FaUserCheck size={20} /> Bienvenue {user && user.name} </p>
            {profile.profile !== null
            ? <Fragment>
                <MyAccountActions/>
                <ExperienceList experiences={profile.profile.experience}/>
                <EducationList educations={profile.profile.education}/>
            </Fragment>
            : <Fragment>
                <p>Tu n'as pas encore renseigné ton profil</p>
                <Link to="creer-profil" className="btn btn-outline-primary font-weight-bold">Créer mon profil</Link>
                </Fragment>
            }
            <hr/>
            <button className="btn btn-danger" onClick={()=>deleteAccount()}>Supprimer mon compte</button>
        </Fragment>
    );
};
MyAccount.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
    auth: state.authReducer,
    profile: state.profileReducer,
});
export default connect(mapStateToProps, { getCurrentProfile,deleteAccount })(MyAccount);
