import React, { useState, useContext } from "react";
import { Button, Form } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

import { useMutation, gql } from "@apollo/client";
import { AuthContext } from "../context/auth";

const Login = () => {
  const context = useContext(AuthContext);
  let navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      // console.log("in success")
      console.log(userData);
      context.login(userData);
      navigate(`/`);
      // history.push("/");
    },
    onError(err) {
      if (err.graphQLErrors) {
        console.log("in Error");
        console.log(err);
        console.log(err.graphQLErrors);
        setErrors(err.graphQLErrors[0].extensions.errors);
      }
    },
    variables: values,
  });

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    loginUser();
  };

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Register</h1>
        <Form.Input
          label="Username"
          palceholder="Username..."
          name="username"
          type="text"
          value={values.username}
          error={errors.username ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          palceholder="Password..."
          name="password"
          type="password"
          value={values.password}
          error={errors.password ? true : false}
          onChange={onChange}
        />

        <Button type="submit" primary>
          Login
        </Button>
      </Form>

      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const LOGIN_USER = gql`
  mutation Mutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      token
      username
    }
  }
`;

export default Login;
