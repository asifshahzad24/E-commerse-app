import React from "react";
import { BrowserRouter, Switch, Router, Route } from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./core/Home";

const Routes = () => {
    return (
        <BrowserRouter>            
            <Switch>
                <Route path="/" exact component={Home}></Route>
                <Route path="/signup" exact component={Signup}></Route>
                <Route path="/signin" exact component={Signin}></Route>
            </Switch>
        </BrowserRouter>
    )
};

export default Routes;






