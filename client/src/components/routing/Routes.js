import React from 'react'
import MyAccount from "../account/MyAccount";
import Register from "../auth/Register";
import Login from "../auth/Login";
import PrivateRoute from "../routing/PrivateRoute";
import CreateProfile from "../profile-forms/CreateProfile";
import EditProfile from "../profile-forms/EditProfile";
import UpdateProfilExperience from "../profile-forms/UpdateProfilExperience";
import UpdateProfileEducation from "../profile-forms/UpdateProfileEducation";
import Profiles from "../profiles/Profiles";
import Profile from "../profile/Profile";
import Posts from "../posts/Posts";
import PostForm from "../posts/PostForm";
import Post from "../post/Post";
import NotFound from "../layout/NotFound";
import {  Route, Switch } from "react-router-dom";

const Routes = () => {
    return <main className="container">
        <Switch>
            <Route exact path="/profils" component={Profiles} />
            <Route exact path="/profil/:id" component={Profile} />
            <Route exact path="/inscription"  component={Register} />
            <Route exact path="/connexion" component={Login} />

            <PrivateRoute exact path="/articles" component={Posts}/>
            <PrivateRoute exact path="/articles/creer" component={PostForm}/>
            <PrivateRoute exact path="/articles/:post_id" component={Post}/>
            <PrivateRoute exact path="/mon-compte"  component={MyAccount} />
            <PrivateRoute exact path="/creer-profil" component={CreateProfile} />
            <PrivateRoute exact path="/editer-profil"  component={EditProfile} />
            <PrivateRoute exact path="/ajouter-experience"  component={UpdateProfilExperience}/>
            <PrivateRoute exact path="/ajouter-diplome"  component={UpdateProfileEducation}  />
            <Route component={NotFound} />
        </Switch>
    </main>
    
}

export default Routes
