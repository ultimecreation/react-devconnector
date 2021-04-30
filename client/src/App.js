import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import { Provider } from "react-redux";
import store from "./components/redux/store";
import Alert from "./components/layout/Alert";
import MyAccount from "./components/layout/MyAccount";
import { USER_LOGOUT } from "./components/redux/auth/types";
import { loadUser } from "./components/redux/auth/actions";
import { useEffect } from "react";
import setAuthToken from "./utils/setAuthToken";
import PrivateRoute from "./components/routing/PrivateRoute";

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {

    useEffect(() => {
        store.dispatch(loadUser())
    }, []);

    return (
        <Provider store={store}>
            <div className="App mt-2 pt-5">
                <BrowserRouter>
                    <Navbar />
                    <Alert />
                    <Route exact path="/" component={Landing} />
                    <main className="container pt-5">
                        <Switch>
                            <Route
                                exact
                                path="/inscription"
                                component={Register}
                            />
                            <Route exact path="/connexion" component={Login} />
                            
                            <PrivateRoute
                                exact
                                path="/mon-compte"
                                component={MyAccount}
                            />
                        </Switch>
                    </main>
                </BrowserRouter>
            </div>
        </Provider>
    );
};

export default App;
