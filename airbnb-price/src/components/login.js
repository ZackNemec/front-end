import React, { useState } from "react";
import {
  CardTitle,
  Card,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import { useHistory } from "react-router-dom";
import { axiosWithAuth as axios } from "../utils/axiosWithAuth";
import "../styling/login.css";
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
        window.localStorage.setItem("user", res.data.user_id);
        history.push(`/userprofile/${res.data.user_id}`);
        window.location.reload(true);
        // added by zack, let me know if this is alright
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Card className="loginCard">
        <CardTitle style={{ margin: "1% auto" }}>Login</CardTitle>
        <Form style={{ margin: "1% auto" }} onSubmit={submitLogin}>
          <FormGroup>
            <Label for="usernameinputlogin">Username</Label>
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
          <Button>Login</Button>
        </Form>
      </Card>
    </>
  );
};
export default Login;
