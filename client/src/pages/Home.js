import React from 'react'

import { gql,useQuery } from "@apollo/client";
import { Grid, Transition } from 'semantic-ui-react';

import PostCard from '../components/PostCard';


const Home = () => {

    const {
        loading,
         data
      } = useQuery(FETCH_POSTS_QUERY);


  return (
    <Grid columns={3}>
    <Grid.Row className="page-title">
      <h1>Recent Posts</h1>
    </Grid.Row>
    <Grid.Row>
      {loading ? (
        <h1>Loading posts..</h1>
      ) : (
        <Transition.Group>
          {data &&
            data.getPosts.map((post) => (
              <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                <PostCard post={post} />
              </Grid.Column>
            ))}
        </Transition.Group>
      )}
    </Grid.Row>
  </Grid>
  )
}

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default Home