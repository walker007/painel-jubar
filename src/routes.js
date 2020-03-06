import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import PrivateRoute from './Middleware/privateRoute';
import GuestRoute from './Middleware/guestRoute';

// Route Views
import BlogOverview from "./views/BlogOverview";
import UserProfileLite from "./views/UserProfileLite";
import AddNewPost from "./views/AddNewPost";
import EditPost from "./views/EditPost";
import BlogPosts from "./views/BlogPosts";
import SignIn from "./views/Login"
import Error from "./views/Errors"

const Routes = () => {
  return(
    <BrowserRouter>
      <Switch>
      <PrivateRoute exact path="/add-post" component={AddNewPost}/>
        <PrivateRoute exact path="/edit-post/:id" component={EditPost}/>
        <PrivateRoute exact path="/listar-posts/" component={BlogPosts}/>
        <PrivateRoute exact path="/dashboard" component={BlogOverview}/>
        <GuestRoute exact path='/login' component={SignIn}/>
        <Route path='*' component={Error}/>
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
