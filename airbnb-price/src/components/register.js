import React from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import * as yup from "yup";
import axios from "axios";

const Register = () => {
  const formSchema = yup.object().shape({
    username: yup
      .string()
      .required("username is required")
      .min(4, "username is too short")
      .max(15, "username is too long"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password is too short, 8 characters minimum")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters"),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });
  const [errors, setErrors] = React.useState({
    username: "",
    password: "",
  });

  const [regData, setRegData] = React.useState({
    username: "",
    password: "",
  });
  const changeHandler = (e) => {
    setRegData({ ...regData, [e.target.name]: e.target.value });
  };
  const submit = () => {
    axios
      .post("https://buildweek-airbnb.herokuapp.com/api/auth/register", regData)
      .then((results) => {
        console.log("returned data from post", results.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Form
        onSubmit={(event) => {
          event.preventDefault();
          submit();
          console.log(regData);
        }}
      >
        <FormGroup>
          <Label for="usernameInput">UserName</Label>
          <Input
            type="text"
            placeholder="Username"
            name="username"
            id="usernameInput"
            value={regData.username}
            onChange={changeHandler}
          />
          {errors.username.length < 4 ? (
            <p className="error">{errors.username}</p>
          ) : null}
        </FormGroup>
        <FormGroup>
          <Label for="passwordInput">Password</Label>
          <Input
            type="password"
            placeholder="Password"
            name="password"
            id="passwordInput"
            value={regData.password}
            onChange={changeHandler}
          />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    </>
  );
};

export default Register;
