import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {BiCheck} from 'react-icons/bi'
import {TiPlus} from 'react-icons/ti'

const ProfileItem = ({ profile }) => {
    return (
        <div className="col-lg-6">
        <div className="card my-5">
            <div className="card-header d-flex justify-content-between">
                <h2>{profile.user.name} </h2>
                <p className="text-info font-weight-bold">{profile.status} </p>
            </div>
            <div className="card-body d-flex align-items-center">
                <figure className="w-25">
                    <img
                        src={profile.user.avatar}
                        alt={profile.user.name}
                        className="img-fluid rounded-circle "
                    />
                </figure>
                <div className="w-75 ml-2 ml-md-5">
                    <p>Companie: {profile.company} </p>
                    <p>Adresse: {profile.location}</p>
                    <p>Compétences:{' '}
                        {profile.skills.slice(0,3).map((skill,index) =>{
                           return <span key={index}><BiCheck size={24} color="green"/>{skill} </span>
                        })} 
                    </p>
                </div>
            </div>
            <div className="card-footer">
            <Link to={`/profil/${profile.user._id}`} className="btn btn-outline-primary btn-sm float-right font-weight-bold">En savoir <TiPlus/></Link>
            </div>
        </div></div>
    );
};

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired,
};

export default ProfileItem;
