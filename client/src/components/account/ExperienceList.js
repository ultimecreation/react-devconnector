import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Fragment } from "react";
import Moment from "react-moment";
import {deleteExperience} from '../redux/profile/actions'
const ExperienceList = ({ experiences,deleteExperience }) => {
    return (
        <Fragment>
            <h2 className="my-5">Expériences</h2>
            <ul className="list-unstyled">
                {experiences.map((experience) => {
                    return (
                      
                            <li key={experience._id}>
                            <p>Poste: {experience.title} </p>
                            <p>Companie: {experience.company} </p>
                            <p>Adresse: {experience.location} </p>
                            <p>Description: {experience.description} </p>
                            <p >
                                <span>Date: {" "}
                                    <Moment format="DD/MM/YYYY">
                                        {experience.from}
                                    </Moment>
                                {' '}-{' '} 
                                    {
                                        experience.current === true 
                                        ?  "jusqu'à ce jour"
                                        :<Moment format="DD/MM/YYYY">
                                            {experience.to}
                                        </Moment>
                                    }
                                </span>
                            </p>
                            <button className="btn btn-danger btn-sm" onClick={()=>deleteExperience(experience._id)}>Supprimer</button><hr/>
                        </li>
                     
                    );
                })}
            </ul>
        </Fragment>
    );
};

ExperienceList.propTypes = {
    experiences: PropTypes.array.isRequired,

};

export default connect(null,{deleteExperience})(ExperienceList);
