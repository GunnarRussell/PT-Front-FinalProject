import React from 'react'
import './card-container.css';
import PlayingCard from '../playing-card/playing-card';

export default function CardContainer(props) {

    const hand = props.hand;

  return (
    <>
        <div className="player-hand">

            {hand.map(function(card)
            {
                //return the Comment component and pass the state update functions to it as props
                return(
                <PlayingCard
                    num = {card.num}
                    suit = {card.suit}
                    key = {card.id}
                />)
            })}
        </div>
    </>
  )
}
