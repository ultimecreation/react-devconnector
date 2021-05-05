import React, { useState } from "react";
import { connect } from "react-redux";
import { setAlert } from "../redux/alert/actions";
import { registerUser } from "../redux/auth/actions";
import PropTypes from "prop-types";
import { Redirect } from "react-router";
import { Fragment } from "react";

const Register = ({ setAlert, registerUser,isAuthenticated  }) => {
    const [formData, setFromData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirm: "",
    });

    const { name, email, password, password_confirm } = formData;

    const onChange = (e) => {
        setFromData(() => {
            return { ...formData, [e.target.name]: e.target.value };
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (password !== password_confirm) {
            setAlert("danger", "Les mots de passe ne correspondent pas");
        } else {
            registerUser(name, email, password, password_confirm);
            setFromData({name:"",email:"",password:"",password_confirm:""});
        }
    };
    if(isAuthenticated) return <Redirect to="/mon-compte"/>
    return (
        <Fragment>
            <h1>Inscription</h1>
            <div className="col-8 mx-auto">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Nom</label>
                        <input
                            name="name"
                            value={name}
                            type="text"
                            className="form-control"
                            onChange={(e) => onChange(e)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            name="email"
                            value={email}
                            type="email"
                            className="form-control"
                            onChange={(e) => onChange(e)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Mot de passe</label>
                        <input
                            name="password"
                            value={password}
                            type="password"
                            className="form-control"
                            onChange={(e) => onChange(e)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password_confirm">
                            Confirmation du mot de passe
                        </label>
                        <input
                            name="password_confirm"
                            value={password_confirm}
                            type="password"
                            className="form-control"
                            onChange={(e) => onChange(e)}
                        />
                    </div>

                    <input
                        type="submit"
                        value="M'inscrire"
                        className="btn btn-primary mt-3 btn-block"
                    />
                </form>
            </div>
        </Fragment>
    );
};
Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    registerUser: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};
const mapStateToProps = state=> ({
    isAuthenticated: state.authReducer.isAuthenticated
})
export default connect(mapStateToProps, { setAlert, registerUser })(Register);
