import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

export default function ScoreForm(props) {
  //state hooks for name and comment input fields
  const [inputName, setInputName] = useState("");

  //state hook for button disable to prevent spamming
  const [buttonDisabled, setButtonDisabled] = useState(false);

  //deconstruct props
  const {createScore, totalScores, handleScoreTableClose, score} = props;

  //Button to create new comment
  function createButton()
  {
    //input validation
    if(inputName != "")
    {
        setButtonDisabled(true);
        //set values of comment object
        const newScore =
        {
            id: (totalScores.length + 1),
            name: inputName,
            score: score,
        }

        //push comment to API
        createScore(newScore);

        //empty input fields
        setInputName("");

        //close window after delay
        setTimeout(() =>
        { 
        handleScoreTableClose();
        setButtonDisabled(false);
        }, 1200);
    }

  }

  //grabs name data from input field
  function handleNameChange(event)
  {
        setInputName(event.target.value);
  }

return (
  <div>
      {/* New Score Form */}
      <div className="jumbotron card shadow-sm new-comment-box">
          {/* Input Name, uses onChange event to read input */}
          <input type="text" onChange={handleNameChange} value={inputName} className="form-control w-100" placeholder="Your Name"/>
          
        {/* Submit Button */}
        <Button
            onClick={createButton}
            variant="primary"
            disabled={buttonDisabled}
        >
            Submit Score
        </Button>
      </div>
      
  </div>
  )
}
