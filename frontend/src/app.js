import React from "react";
import { Switch, Route, HashRouter, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/home";
import ResourceList from "./pages/resourcesList";

const App = (props) => {

    return (
        <HashRouter>
            <ToastContainer />
            <Route>
                <Switch>
                    <Route Route exact path="/home" component={Home} />
                    <Route Route exact path="/recursos" component={ResourceList} />
                    <Redirect exact from="/" to="/home" />
                </Switch>
            </Route>
        </HashRouter>
    )
}

export default App;
