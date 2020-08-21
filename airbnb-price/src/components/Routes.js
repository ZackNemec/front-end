import React from "react";
import { Route } from "react-router-dom";
import Login from "./login";
import Register from "./register";
import PrivateRoute from "../utils/PrivateRoute";
import UserProfile from "./userprofile";
const Routes = () => {
  return (
    <>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <PrivateRoute exact path="/userprofile/:id" component={UserProfile} />
    </>
  );
};
export default Routes;