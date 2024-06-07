import React, { useEffect, useState } from 'react';
import ScoreList from '../high score components/score-list/score-list.jsx';
import { scoreAPI } from '../../rest/scoreAPI.js';

import Card from 'react-bootstrap/ListGroup';

export default function ScoreContainer() {

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

        console.log("Fetched scores:", scoresData);

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

    //deleteScore
    async function deleteScore(score)
    {
      //passes specific score to the scoreAPI DELETE method in order to delete it
      await scoreAPI.delete(score)

      //call fetchScores method in order to set state (scores) to array of newly deleted and fetched scores
      fetchScores();
    }

  return (
    <div className="page">
      <div className="score-box">
        <ScoreList 
            scores = {scores}
            updateScore = {updateScore}
            deleteScore = {deleteScore}
        />
      </div>
    </div>
  )
}
