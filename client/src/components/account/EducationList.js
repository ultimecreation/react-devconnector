import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Fragment } from "react";
import Moment from "react-moment";
import { deleteEducation } from "../redux/profile/actions";
const EducationList = ({ educations, deleteEducation }) => {
    return (
        <Fragment>
            <h2 className="my-5">Diplomes</h2>
            <ul className="list-unstyled">
                {educations.length === 0 
                ? <p>Pas de diplome renseigné</p>
                : educations.map((education) => {
                    return (
                       
                            <li key={education._id}>
                            <p>Poste: {education.school} </p>
                            <p>Companie: {education.degree} </p>
                            <p>Adresse: {education.location ?? ''} </p>
                            <p>Description: {education.description ??''} </p>
                            <p >
                                <span>Date: {" "}
                                    <Moment format="DD/MM/YYYY">
                                        {education.from}
                                    </Moment>
                                {' '}-{' '} 
                                    {
                                        education.current === true 
                                        ?  "jusqu'à ce jour"
                                        :<Moment format="DD/MM/YYYY">
                                            {education.to}
                                        </Moment>
                                    }
                                </span>
                            </p>
                            <button className="btn btn-danger btn-sm" onClick={()=>deleteEducation(education._id)}>Supprimer</button><hr/>
                        </li>
                       
                    );
                })}
            </ul>
        </Fragment>
    );
};

EducationList.propTypes = {
    educations: PropTypes.array.isRequired,
    deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, {deleteEducation})(EducationList);