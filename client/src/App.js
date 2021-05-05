import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import { Provider } from "react-redux";
import store from "./components/redux/store";
import Alert from "./components/layout/Alert";
import MyAccount from "./components/account/MyAccount";
import { loadUser } from "./components/redux/auth/actions";
import { useEffect } from "react";
import setAuthToken from "./utils/setAuthToken";
import PrivateRoute from "./components/routing/PrivateRoute";
import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/EditProfile";
import UpdateProfilExperience from "./components/profile-forms/UpdateProfilExperience";
import UpdateProfileEducation from "./components/profile-forms/UpdateProfileEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import PostForm from "./components/posts/PostForm";

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    return (
        <Provider store={store}>
            <div className="App mt-2 pt-5 ">
                <BrowserRouter>
                    <Navbar />
                    <Alert />
                    <Route exact path="/" component={Landing} />
                    <main className="container">
                        <Switch>
                            <Route exact path="/profils" component={Profiles} />
                            <Route exact path="/profil/:id" component={Profile} />
                            <Route exact path="/inscription"  component={Register} />
                            <Route exact path="/connexion" component={Login} />

                            <PrivateRoute exact path="/articles" component={Posts}/>
                            <PrivateRoute exact path="/articles/creer" component={PostForm}/>
                            <PrivateRoute exact path="/mon-compte"  component={MyAccount} />
                            <PrivateRoute exact path="/creer-profil" component={CreateProfile} />
                            <PrivateRoute exact path="/editer-profil"  component={EditProfile} />
                            <PrivateRoute exact path="/ajouter-experience"  component={UpdateProfilExperience}/>
                            <PrivateRoute exact path="/ajouter-diplome"  component={UpdateProfileEducation}  />
                        </Switch>
                    </main>
                </BrowserRouter>
            </div>
        </Provider>
    );
};

export default App;
