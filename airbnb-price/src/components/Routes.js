import React from "react";
import { Route } from "react-router-dom";
import Login from "./login";
import Register from "./register";

const Routes = () => {
  return (
    <>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
    </>
  );
};
export default Routes;
