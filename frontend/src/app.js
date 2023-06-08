import React from "react";
import { Switch, Route, HashRouter, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/home";
import Resources from "./pages/resources";
import Levels from "./pages/levels";
import PlanList from "./pages/planList";
import PlanForm from "./pages/planForm";
import Employees from "./pages/employees";
import PlanEvaluate from "./pages/planEvaluate";

const App = (props) => {

    return (
        <HashRouter>
            <ToastContainer />
            <Route>
                <Switch>
                    <Route Route exact path="/home" component={Home} />
                    <Route Route exact path="/recursos" component={Resources} />
                    <Route Route exact path="/niveles" component={Levels} />
                    <Route Route exact path="/planes-listar" component={PlanList} />
                    <Route Route exact path="/plan-crear" component={PlanForm} />
                    <Route Route exact path="/colaboradores" component={Employees} />
                    <Route Route exact path="/evaluar/:id" component={PlanEvaluate} />
                    <Redirect exact from="/" to="/home" />
                </Switch>
            </Route>
        </HashRouter>
    )
}

export default App;
