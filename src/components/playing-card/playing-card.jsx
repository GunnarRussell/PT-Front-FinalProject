import React from 'react'
import './playing-card.css';

export default function PlayingCard(props) {

    const {num, suit} = props;
    let value;
    let trueSuit;
    let colorClass = "playingCard";
    
    //if-tree determines color based on suit
    if(suit === 'D')
    {
        colorClass = 'playingCard red';
        trueSuit = '[';
    }
    else if(suit === 'H')
    {
        colorClass = 'playingCard red';
        trueSuit = '{';
    }
    else if(suit === 'C')
    {
        colorClass = 'playingCard black';
        trueSuit = ']';
    }
    else
    {
        colorClass = 'playingCard black';
        trueSuit = '}';
    }

    //if-tree determines value of card ('=' is single-spaced '10' with this font)
    if(num === 'J' || num === 'Q' || num === 'K' || num === '=')
    {
        value = 10;
    }
    else if(num === 'A')
    {
        value = 11;
        //check total points, if higher than 21, set value to 1
    }
    else
    {
        value = num;
    }

  return (
    <div className={colorClass}>
        <div className="corner">{num}</div>
        <div className="suit">{trueSuit}</div>
    </div>
  )
}
