import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import CloseButton from 'react-bootstrap/CloseButton';
import Button from 'react-bootstrap/Button';

export default function Score(props) {
    const {score, updateScore, deleteScore} = props;

    function deleteButton()
    {
        deleteScore(score);
        console.log("Deleted score: ", score.id)
    }

  return (
    <>
        <ListGroup.Item>{score.score} {score.name} <Button onClick={deleteButton}>X</Button></ListGroup.Item>
    </>
  )
}
