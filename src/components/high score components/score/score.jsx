import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import './score.css';

export default function Score(props) {
    const {score, updateScore, deleteScore} = props;

    function deleteButton()
    {
        deleteScore(score);
        console.log("Deleted score: ", score.id)
    }

  return (
    <>
        <ListGroup.Item className="score">
          <ul>
            <li>
              {score.name}
            </li>
            <li>
              {score.score}
            </li>
              <Button className="close" onClick={deleteButton}>X</Button>
          </ul>
        </ListGroup.Item>
    </>
  )
}
