import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import ScoreForm from '../score-form/score-form.jsx';
import Score from '../score/score.jsx';
import { scoreAPI } from '../../rest/scoreAPI.js';

export default function ScoreList() {

    //STATE HOOK
    //array of score fetched from API
    //setScores method can be used to change state
    //default state is empty array
    const [scores, setScores] = useState([]);
    
    //EFFECT HOOK
    //updates every render (since the dependency array listed afterwards is empty)
    useEffect(() => 
    {
        //every render, call fetchScores method
        fetchScores();
    }, []);

    //fetchScores fetches scores from API and sets the scores state to the fetched comments
    //must be an async function in order to use await keyword
    async function fetchScores()
    {
        //use GET request to fetch array of scores from API
        const scoresData = await scoreAPI.get();

        //set state (scores) to array of fetched scores
        setScores(scoresData);
    };

    //updateScore passes specific score to the scoreAPI PUT method in order to update it, and then sets the scores state to the newly updated and fetched scores
    async function updateScore(updatedScore)
    {
        //passes specific score to the scoreAPI PUT method in order to update it
        await scoreAPI.put(updatedScore);

        //call fetchScores method in order to set state (scores) to array of newly updated and fetched scores
        fetchScores();
    };

    //createScore
    async function createScore(newScore)
    {
      //passes new score to the scoresAPI POST method in order to create it
      await scoreAPI.post(newScore)

      //call fetchScores method in order to set state (score) to array of newly created and fetched scores
      fetchScores();
    }

    //deleteScore
    async function deleteScore(score)
    {
      //passes specific score to the scoreAPI DELETE method in order to delete it
      await scoreAPI.delete(score)

      //call fetchScores method in order to set state (scores) to array of newly deleted and fetched scores
      fetchScores();
    }

  return (
    <div>
        <ListGroup variant="flush">
            {/* Map over the scores array, for each score in the array, perform the following function: */}
            {scores.map(function(score)
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

            <br />

        {/* Comment Form component */}
        <ScoreForm 
          score = {99999}
          totalScores = {scores}
          createScore = {createScore}
        />

    </div>
  )
}
