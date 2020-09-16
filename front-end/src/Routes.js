import React from "react";
import { BrowserRouter, Switch, Router, Route } from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./core/Home";
import PrivateRoute from './auth/PrivateRoute';
import Dashboard from './user/UserDashboard';
import AdminRoute from './auth/AdminRoute';
import AdminDashboard from './user/AdminDashboard';
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';
import Shop from "./core/Shop";

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}></Route>
                <Route path="/shop" exact component={Shop}></Route>
                <Route path="/signup" exact component={Signup}></Route>
                <Route path="/signin" exact component={Signin}></Route>
                <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
                <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
                <AdminRoute path="/create/category" exact component={AddCategory} />
                <AdminRoute path="/create/product" exact component={AddProduct} />
            </Switch>
        </BrowserRouter>
    )
};

export default Routes;






