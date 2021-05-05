import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import {updateEducation} from '../redux/profile/actions'
const UpdateProfileEducation = ({updateEducation,history}) => {

    const [formData,setFormData] = useState({
        school:'',
        degree:'',
        fieldOfStudy:'',
        description:'',
        from:'',
        to:'',
        current:false
    })
    const [toDateDisabled,setToDateDisabled] = useState(false)
    const {school, degree,fieldOfStudy,description,location,from,to,current} = formData

    const onChange = e =>{
        setFormData( prevState => {
            return { ...prevState, [e.target.name]: e.target.value}
        })
    }

    const onSubmit = e => {
        e.preventDefault()
        formData.current = formData.current ==='on'? true: false
       
        updateEducation(formData,history)
    }
    return (
        <>
            <h1 className="text-primary">Ajouter un diplome</h1>
            <div className="col-8 mx-auto">
       
                <form onSubmit={e=> onSubmit(e)} className="mb-5">
                    <fieldset className="my-5">
                        <legend>Informations sur le diplome</legend>
                        <div className="form-group">
                            <label htmlFor="school">École</label>
                            <input type="text" name="school" value={school} className="form-control" onChange={e => onChange(e)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="location">Adresse</label>
                            <input type="text" name="location" value={location} className="form-control" onChange={e => onChange(e)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="degree">Diplome</label>
                            <input type="text" name="degree" value={degree} className="form-control" onChange={e => onChange(e)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="fieldOfStudy">Filiaire</label>
                            <input type="text" name="fieldOfStudy" value={fieldOfStudy} className="form-control" onChange={e => onChange(e)} />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea name="description" value={description} cols="30" rows="5" className="form-control" onChange={e => onChange(e)}></textarea>
                        </div>
                    </fieldset>

                    <fieldset  className="my-3">
                        <legend >Période</legend>
                        <div className="form-row">
                        
                            <div className="form-group col-md-6">
                                <label htmlFor="from">De</label>
                                <input type="date" name="from" id="from" value={from} className="form-control" onChange={e => onChange(e)}/>
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="to">Jusqu'à</label>
                                <input type="date" name="to" id="to" value={to} className="form-control" onChange={e => onChange(e)} disabled={toDateDisabled}/>
                            </div>
                           
                            
                        </div>
                        <div className="form-group">
                            <input type="checkbox" name="current" id="current"className="mr-2" checked={current} onChange={e =>{ 
                                onChange(e) 
                                setToDateDisabled(!toDateDisabled)
                                }}/>
                            <label htmlFor="current">{" "} En cours d'obtention</label>
                        </div>
                    </fieldset>
                    
                    <input type="submit"className="btn btn-primary btn-block"/>
                </form>
            </div>
        </>
    )
}

UpdateProfileEducation.propTypes = {
    updateEducation: PropTypes.func.isRequired,
}

export default connect(null, {updateEducation })(withRouter(UpdateProfileEducation))
