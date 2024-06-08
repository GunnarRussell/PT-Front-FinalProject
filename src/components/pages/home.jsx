import React from 'react'
import './pages.css';

import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="page">
      <div className="how-to-play">
      <h1>Welcome to BlackJack GO!</h1>
        <p>BlackJack GO is a quick and casual take on the classic card game. The goal is to have a hand value as close to 21 as possible without exceeding it. Beat the dealer by having a higher hand value or survive the round while the dealer busts to earn points.</p>
        <p>You start the game with a hand of two cards. The total value of your hand is displayed in the middle of the game board. Press the <span className="text-button">Hit</span> button to take another card, and then press <span className="text-button">Stand</span> when you're satisfied with your hand. The dealer starts with one card visible, so you'll get a hint of what you're going up against. Once you press <span className="text-button">Stand</span>, the dealer will take their turn drawing cards. If you win the round, you'll earn points equal to your hand total. If you lose or if you go over 21, you'll lose a 🪙Life. After 5 losses, it's Game Over!</p>
        <p>There's no betting or gambling in this version of BlackJack. Simply play and try to get the high score!</p>
        <h1>Hints</h1>
        <ul>
          <li>The dealer will always draw cards until they have a hand value of at least 17 points, at which point they'll stop even if their hand value is lower than yours.</li>
          <li>Jack, Queen, and King cards are worth 10 points. That means that including the '10' cards, roughly 30% of the cards in the deck are worth 10 points. Keep that in mind when deciding to hit or stay!</li>
          <li>Aces are worth either 11 points or 1 point, whichever is more convenient for your hand. The value of each Ace will automatically change to give you the highest total hand value without going over 21. You're welcome!</li>
          <li>The deck is made up of several decks shuffled together, so you may see multiples of the same card. Sorry, but you can't count cards!</li>
        </ul>
      </div>
      <Link to="/game" className="new-font">
        <Button 
          className="button" 
          variant="outline-light" 
          size="lg"
        >
          Play!
        </Button>
      </Link>
      
    </div>
  )
}
