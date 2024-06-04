import React, { useState } from 'react';

export default function ScoreForm(props) {
  //state hooks for name and comment input fields
  const [inputName, setInputName] = useState("");

  //deconstruct props
  const {createScore, totalScores, score} = props;

  //Button to create new comment
  function createButton()
  {
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
          <button onClick={createButton} className="btn btn-primary form-control">Submit Score</button>
      </div>
      
  </div>
  )
}
