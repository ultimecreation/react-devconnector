import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
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

export default Landing;
