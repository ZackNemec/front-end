import React from "react";
import {
  CardTitle,
  Card,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import * as yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Register = () => {
  const [regData, setRegData] = React.useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = React.useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [serverError, setServerError] = React.useState("");

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
      .matches(/[a-zA-Z0-9]/, "can only use Latin Letters and Numerals"),
  });
  const validateChange = (e) => {
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then((valid) => {
        setErrors({ ...errors, [e.target.name]: "" });
      })
      .catch((err) => {
        console.log(err);
        setErrors({ ...errors, [e.target.name]: err.errors[0] });
      });
  };

  const changeHandler = (e) => {
    setRegData({ ...regData, [e.target.name]: e.target.value });
    e.persist();
    console.log(e.target.name, e.target.value);
    validateChange(e);
    console.log(errors);
  };
  const history = useHistory();
  const submit = (e) => {
    formSchema.validate(regData).then(() => {
      axios
        .post(
          "https://buildweek-airbnb.herokuapp.com/api/auth/register",
          regData
        )
        .then((results) => {
          console.log("returned data from post", results.data);
          history.push("/login");
        })
        .catch((err) => {
          setServerError(`Username is take, please try ${regData.username}1`);
        });
    });
  };

  return (
    <>
      <Card
        style={{
          margin: "12% auto",
          width: "40%",
        }}
      >
        <CardTitle style={{ margin: "1% auto" }}>Sign Up Here</CardTitle>
        <Form
          style={{ margin: "1% auto" }}
          onSubmit={(e) => {
            e.preventDefault();
            submit();
            console.log(regData);
          }}
        >
          {serverError ? (
            <p className="error" style={{ color: "red" }}>
              {serverError}
            </p>
          ) : null}
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
            {errors.username.length > 3 || errors.username.length < 15 ? (
              <p className="error" style={{ color: "red" }}>
                {errors.username}
              </p>
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
            {errors.password.length > 7 ? (
              <p className="error" style={{ color: "red" }}>
                {errors.password}
              </p>
            ) : null}
          </FormGroup>
          <Button>Register</Button>
        </Form>
      </Card>
    </>
  );
};

export default Register;
