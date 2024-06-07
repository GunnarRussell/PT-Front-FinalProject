import React, { useEffect, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Score from '../../high score components/score/score.jsx';

import './score-list.css';

export default function ScoreList(props) {

    const { updateScore, deleteScore, scores} = props;

  return (
    <div className="score-list">
        <ListGroup numbered variant="flush">
            {/* Sort and then map over the scores array, for each score in the array, perform the following function: */}
            {scores
              .sort((a, b) => b.score - a.score)
              .map(function(score)
              {
                  //return the Score component and pass the state update functions to it as props
                  return(
                  <Score
                    score = {score}
                    updateScore = {updateScore}
                    deleteScore = {deleteScore}

                    // assign a key to each score. the key is the score ID for that comment, pulled from the API
                    key = {score.id}
                  />
                  )
              }
            )}
          </ListGroup>
    </div>
  )
}
