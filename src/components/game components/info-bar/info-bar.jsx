import React from 'react'
import LifeContainer from '../../game components/life-container/life-container.jsx';
import CurrentScore from '../../game components/current-score/current-score.jsx';

export default function InfoBar(props) {

    const {lives, totalPoints} = props;

  return (
    <div>
        <div className="info-bar">
            <LifeContainer lives={lives}/>
            <CurrentScore score={totalPoints}/>
        </div>
    </div>
  )
}
