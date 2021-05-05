import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import { Provider } from "react-redux";
import store from "./components/redux/store";
import Alert from "./components/layout/Alert";
import { loadUser } from "./components/redux/auth/actions";
import { useEffect } from "react";
import setAuthToken from "./utils/setAuthToken";
import Routes from "./components/routing/Routes";

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
                    <Switch>
                        <Route exact path="/" component={Landing} />
                        <Route component={Routes}/>
                    </Switch>
                   
                </BrowserRouter>
            </div>
        </Provider>
    );
};

export default App;
