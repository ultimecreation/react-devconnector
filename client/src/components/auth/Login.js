import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../redux/auth/actions";
import PropTypes from "prop-types";

const Login = ({ login,isAuthenticated }) => {
    const [formData, setFromData] = useState({
        email: "",
        password: "",
    });

    const { email, password } = formData;

    const onChange = (e) => {
        setFromData(() => {
            return { ...formData, [e.target.name]: e.target.value };
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        login(email, password);
        setFromData({email:"",password:""});
    };

    if(isAuthenticated) return <Redirect to="/mon-compte"/>
    return (
        <div>
            <h1>Connexion</h1>
            <div className="col-8 mx-auto">
                <form onSubmit={onSubmit}>
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

                    <input
                        type="submit"
                        value="Me connecter"
                        className="btn btn-primary btn-block mt-3 "
                    />

                    <div className="text-center">ou</div>
                    <Link
                        to="/inscription"
                        className="btn btn-dark btn-block mt-1"
                    >
                        Créer un Compte
                    </Link>
                </form>
            </div>
        </div>
    );
};
Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};
const mapStateToProps = state=>({
    isAuthenticated: state.authReducer.isAuthenticated
})
export default connect(mapStateToProps, { login })(Login);
