import React from 'react'
import LifeContainer from '../../game components/life-container/life-container.jsx';
import CurrentScore from '../../game components/current-score/current-score.jsx';

import './info-bar.css';

export default function InfoBar(props) {

    const {lives, totalPoints} = props;

  return (
    <div className="info-bar">
        <div className="info-left">
            <LifeContainer lives={lives}/>
        </div>
        <div className="info-right">
            <CurrentScore score={totalPoints}/>
        </div>
        
    </div>
  )
}
