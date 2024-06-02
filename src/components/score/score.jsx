import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

export default function Score(props) {
    const {username, score} = props;
  return (
    <>
        <ListGroup.Item>{score} {username}</ListGroup.Item>
    </>
  )
}
