import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getGithubRepos, getProfileById } from "../redux/profile/actions";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import { BiCheck } from "react-icons/bi";
import Moment from "react-moment";
import { Fragment } from "react";

const Profile = ({ match, getProfileById,getGithubRepos,repos, profile, loading, auth }) => {
    const userId = match.params.id;
    useEffect(() => {
        
        getProfileById(userId);
      
    }, [getProfileById, userId]);
   

    return (
       
        <div className="row ">
            {loading || profile === null ? (
                <Spinner />
            ) : (
                <>
                    <div className="col-12 d-flex justify-content-between align-items-center mx-auto">
                        <Link to="/profils">&lt;&lt; Retour aux profils</Link>

                        {auth.isAuthenticated &&
                            profile.user._id === auth.user._id && (
                                <Link to="/editer-profil" className="ml-auto">
                                    <AiFillEdit /> Modifier mon profil
                                </Link>
                            )}
                    </div>

                    <div className="col-12 ">
                        <div className="bg-info w-100 text-center text-light py-2">
                            <img
                                src={profile.user.avatar}
                                alt={profile.user.name}
                                className="rounded-circle"
                            />
                            <div>
                                <h1>{profile.user.name} </h1>
                                <p>
                                    {profile.status}{" "}
                                    {profile.company &&
                                        `chez ${profile.company}`}{" "}
                                </p>
                                <p>{profile.location} </p>
                            </div>
                        </div>
                        <div className="my-4">
                        <h3>Compétences</h3>
                        {profile.skills.map((skill,index) =>{
                           return <span key={index}><BiCheck size={24} color="green"/>{skill} </span>
                        })} 
                   
                        </div>
                        <div className="my-4">
                            <h3>Expériences</h3>

                            {!profile.experience ? (
                                <p>Pas d'expérience à afficher</p>
                            ) : (
                               
                                <ul className="list-unstyled list-group">
                                    {profile.experience.map((exp) => (
                                       <Fragment key={exp._id}>
                                        <li className="list-group-items">Poste: {exp.title}</li>
                                        <li className="list-group-items">Companie: {profile.company} </li > 
                                        <li className="list-group-items">Adresse: {profile.location} </li > 
                                        <li className="list-group-items">Période: 
                                            <Moment format="DD/MM/YYYY">{exp.from}</Moment>
                                             -  {
                                                 exp.current === true
                                                 ? "jusqu'à ce jour"
                                                 : <Moment format="DD/MM/YYYY">{exp.to}</Moment>
                                             }
                                        
                                        </li > 

                                        <hr/>
                                        </Fragment>
                                    ))}
                                </ul>
                               
                               
                            )}
                        </div>

                        <div className="my-4">
                            <h3>Diplomes</h3>

                            {!profile.education ? (
                                <p>Pas d'expérience à afficher</p>
                            ) : (
                                <ul className="list-unstyled">
                                    {profile.education.map((edu) => (
                                       <Fragment key={edu._id}>
                                       <li className="list-group-items">École: {edu.school}</li>
                                       <li className="list-group-items">Diplome: {edu.degree} </li > 
                                       <li className="list-group-items">Fillière: {edu.fieldOfStudy} </li > 
                                       <li className="list-group-items">Adresse: {edu.location} </li > 
                                       <li className="list-group-items">Période: 
                                           <Moment format="DD/MM/YYYY">{edu.from}</Moment>
                                            -  {
                                                edu.current === true
                                                ? "jusqu'à ce jour"
                                                : <Moment format="DD/MM/YYYY">{edu.to}</Moment>
                                            }
                                       
                                       </li > 

                                       <hr/>
                                       </Fragment>
                                    ))}
                                </ul>
                            )}
                        </div>
                       {/*  <div className="my-4">
                            <h3>Projets</h3>

                            {!repos ? (
                                <p>Pas de projets à afficher</p>
                            ) : (
                               
                                <ul className="list-unstyled list-group">
                                    {repos.map((repo) => (
                                     <Fragment   >
                                          <li className="list-group-items d-flex justify-content-between">
                                            <span>Projet: {repo.name}</span>
                                            <a target="_blank" rel="noreferrer" href={repo.html_url}>Voir le projet</a>
                                        </li><hr/>
                                     </Fragment>
                                       

                                    ))}
                                </ul>
                               
                               
                            )}
                        </div> */}
                    </div>
                </>
            )}
        </div>
    );
};

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object,
    auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    profile: state.profileReducer.profile,
    loading: state.profileReducer.loading,
    auth: state.authReducer,
    repos: state.profileReducer.repos
});
export default connect(mapStateToProps, { getProfileById,getGithubRepos })(Profile);
