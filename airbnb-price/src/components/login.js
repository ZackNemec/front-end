import React from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";

const Login = () => {
  return (
    <>
      <Form>
        <FormGroup>
          <Label for="usernameinputlogin">UserName</Label>
          <Input
            type="text"
            placeholder="Username"
            name="usernameLogin"
            id="usernameInputLogin"
          />
        </FormGroup>
        <FormGroup>
          <Label for="passwordInputLogin">Password</Label>
          <Input
            type="password"
            placeholder="Password"
            name="passwordLogin"
            id="passwordInputLogin"
          />
        </FormGroup>
        <Button>Login In</Button>
      </Form>
    </>
  );
};

export default Login;
