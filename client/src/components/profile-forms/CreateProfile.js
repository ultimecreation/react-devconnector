import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import { Fragment } from 'react'
import { createProfile } from '../redux/profile/actions'

const CreateProfile = ({createProfile,history}) => {
    const [formData,setFormData] = useState({
        company:'',
        website:'',
        location:'',
        bio:'',
        status:'',
        githubUsername:'',
        skills:'',
        youtube:'',
        facebook:'',
        twitter:'',
        instagram:'',
        linkedIn:'',
    })

    const {company,
        website,
        location,
        bio,
        status,
        githubUsername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedIn} = formData

        const onChange = e =>{
            setFormData((prevState)=>{
                return {...formData,[e.target.name]: e.target.value}
            })
        }

        const onSubmit= e=>{
            e.preventDefault()
            console.log(formData)
            createProfile(formData,history)
        }
    return (
        <Fragment>
            <h1 className="text-primary">Créer mon profil</h1>
            <div className="col-9 mx-auto">
       
                <form onSubmit={e=> onSubmit(e)} className="mb-5">
                    <fieldset className="my-5">
                        <legend>Informations personnelles</legend>
                        <div className="form-group">
                            <label htmlFor="location">Adresse</label>
                            <input type="text" name="location" value={location} className="form-control" onChange={e => onChange(e)} />
                        </div>
                       
                        <div className="form-group">
                            <label htmlFor="bio">Bio</label>
                            <textarea name="bio" value={bio} cols="30" rows="5" className="form-control" onChange={e => onChange(e)}></textarea>
                        </div>
                    </fieldset>

                    <fieldset  className="my-3">
                        <legend >Informations professionelles</legend>
                        <div className="form-group">
                            <label htmlFor="company">Companie</label>
                            <input type="text" name="company" value={company} className="form-control" onChange={e => onChange(e)} />
                        </div>
                        <div className="form-row">
                            
                            <div className="form-group col-md-6">
                                <label htmlFor="status">Status</label>
                                <select name="status" value={status} id="status" className="form-control" onChange={e => onChange(e)}>
                                    <option value="">Sélectionner un status</option>
                                    <option value="étudiant">Étudiant</option>
                                    <option value="alternant">Alternant</option>
                                    <option value="développeur">Développeur</option>
                                    <option value="formateur">Formateur</option>
                                    <option value="autre">Autre</option>
                                </select>
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="githubUsername">Pseudo Github</label>
                                <input type="text" name="githubUsername" value={githubUsername} className="form-control" id="githubUsername" onChange={e => onChange(e)}/>
                            </div>
                            
                        </div>
                        <div className="form-group">
                            <label htmlFor="website">Site web</label>
                            <input type="text" name="website" value={website} className="form-control" onChange={e => onChange(e)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="skills">Compétences</label>
                            <input type="text" name="skills" value={skills} className="form-control" onChange={e => onChange(e)} />
                        </div>
                    </fieldset>
                    <fieldset  className="my-3">
                        <legend >réseaux sociaux</legend>
                        <div className="form-group">
                            <label htmlFor="youtube">Youtube</label>
                            <input type="text" name="youtube" value={youtube} className="form-control" onChange={e => onChange(e)} />
                        </div>                        
                        <div className="form-group">
                            <label htmlFor="facebook">Facebook</label>
                            <input type="text" name="facebook" value={facebook} className="form-control" onChange={e => onChange(e)} />
                        </div>                        
                        <div className="form-group">
                            <label htmlFor="twitter">Twitter</label>
                            <input type="text" name="twitter" value={twitter} className="form-control" onChange={e => onChange(e)} />
                        </div>                        
                        <div className="form-group">
                            <label htmlFor="instagram">Instagram</label>
                            <input type="text" name="instagram" value={instagram} className="form-control" onChange={e => onChange(e)} />
                        </div>                        
                        <div className="form-group">
                            <label htmlFor="linkedIn">LinkedIn</label>
                            <input type="text" name="linkedIn" value={linkedIn} className="form-control" onChange={e => onChange(e)} />
                        </div>                        

                    </fieldset>
                    <input type="submit"className="btn btn-primary btn-block"/>
                </form>
            </div>
        </Fragment>
    )
}

CreateProfile.propTypes = {
 createProfile: PropTypes.func,
}

export default connect(null,{createProfile})(withRouter(CreateProfile))
