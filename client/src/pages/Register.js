import React, { useState } from 'react';
import { Button,Form } from 'semantic-ui-react';
import { useNavigate } from "react-router-dom";

import {
  useMutation,
  gql
} from "@apollo/client";

const Register = (props) => {
  const [errors, setErrors] = useState({});
  let navigate = useNavigate();
  const [values,setValues] = useState({
    username:'',
    email:'',
    password:'',
    confirmPassword:''
  })

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(
      _,
      {
        data: { register }
      }
    ) {
      // console.log("in success")
      console.log(register)
      navigate(`/`)
      // history.push("/");
    },
    onError(err) {
      if(err.graphQLErrors){
        console.log("in Error")
        console.log(err)
        console.log(err.graphQLErrors)
        setErrors(err.graphQLErrors[0].extensions.errors);  
      }
    },
    variables: values
  });

  const onChange = e =>{
    setValues({...values,[e.target.name]:e.target.value})
  }
  const onSubmit = e =>{
    e.preventDefault();
    addUser();
  }
  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading':''}>
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
          label="Email"
          palceholder="Email..."
          name="email"
          type="email"
          value={values.usernameEMAIL}
          error={errors.email ? true : false}
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
          <Form.Input
          label="Confirm password"
          palceholder="Confirm password..."
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          error={errors.confirmPassword ? true : false}
          onChange={onChange}
          />

          <Button type='submit' primary>
            Register
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
  )
}

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Register