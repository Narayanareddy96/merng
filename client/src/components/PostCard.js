import React from "react";
import { Button, Card, Icon, Label, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

function PostCard({
  post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) {
  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {createdAt}
          {/* {moment(createdAt).format()} */}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
          <Button color="teal" basic>
            <Icon name="heart" />
          </Button>
          <Label basic color="blue" pointing="left">
            {likeCount}
          </Label>
        </Button>

        <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
          <Button color="blue" basic>
            <Icon name="comments" />
          </Button>
          <Label basic color="blue" pointing="left">
            {commentCount}
          </Label>
        </Button>

        {/* {user && user.username === username && <DeleteButton postId={id} />} */}
      </Card.Content>
    </Card>
  );
}

export default PostCard;
