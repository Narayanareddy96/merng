import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "semantic-ui-react";
const AddPost = () => {

  let navigate = useNavigate();
  const [values, setValues] = useState({
    body: "",
  });
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmit = () => {
    createpost();
  };

  const [createpost, { error }] = useMutation(CREATE_POST_MUTATION, {
    update(_, { result }) {
      // console.log("in success")
    //   console.log(result);
      //   context.login(userData);
        
        navigate(`/`);
      // history.push("/");
    },
    onError(err) {
      if (err.graphQLErrors) {
        console.log("in Error");
        console.log(err);
        console.log(err.graphQLErrors);
        // setErrors(err.graphQLErrors[0].extensions.errors);
      }
    },
    variables: values,
  });

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit}>
        <h1>Create Post</h1>
        <Form.Field>
          <Form.Input
            label="Create Post"
            palceholder="Create Post"
            name="body"
            onChange={onChange}
            value={values.body}
          />
        </Form.Field>
        <Button type="submit" color="teal">
          Submit
        </Button>
      </Form>
    </div>
  );
};

const CREATE_POST_MUTATION = gql`
  mutation Mutation($body: String!) {
    createPost(body: $body) {
      id
      body
      username
      createdAt
      comments {
        id
        createdAt
        username
        body
      }
      likes {
        id
        createdAt
        username
      }
      likeCount
      commentCount
    }
  }
`;

export default AddPost;
