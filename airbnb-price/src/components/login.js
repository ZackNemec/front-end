import React, { useState } from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import { axiosWithAuth as axios } from "../utils/axiosWithAuth";
const Login = () => {
  const history = useHistory();
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  const { username, password } = login;

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const submitLogin = (e) => {
    e.preventDefault();
    axios()
      .post("/api/auth/login", login)
      .then((res) => {
        console.log(res);
        window.localStorage.setItem("token", res.data.token);
        history.push(`/userProfile/${res.data.user_id}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Form onSubmit={submitLogin}>
        <FormGroup>
          <Label for="usernameinputlogin">UserName</Label>
          <Input
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={handleChange}
            id="usernameInputLogin"
          />
        </FormGroup>
        <FormGroup>
          <Label for="passwordInputLogin">Password</Label>
          <Input
            type="password"
            placeholder="Password"
            onChange={handleChange}
            name="password"
            value={password}
            id="passwordInputLogin"
          />
        </FormGroup>
        <Button>Login In</Button>
      </Form>
    </>
  );
};

export default Login;
