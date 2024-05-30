import React, { useEffect, useState } from 'react';
import './pages.css';
import CardContainer from '../card-container/card-container';
import Button from 'react-bootstrap/Button';

export default function game() {

    let deck = [];
    let playerHand = [];
    let dealerHand = [];

    function createDeck(times)
    {
        let x = 1;

        //create card objects for each card in a poker deck, add it to deck array

        for (let i = 0; i < times; i++)
        {
            //SPADES CARDS:
            for(let i = 2; i <= 9; i++)
            {
                // 2 through 9
                let card = {id: x++, num: i, suit: 'S'};
                deck.push(card);

            }
            deck.push({id: x++, num: '=', suit: 'S'}); // 10 (in the card font, '=' displays a single-character '10')
            deck.push({id: x++, num: 'J', suit: 'S'}); // Jack
            deck.push({id: x++, num: 'Q', suit: 'S'}); // Queen
            deck.push({id: x++, num: 'K', suit: 'S'}); // King
            deck.push({id: x++, num: 'A', suit: 'S'}); // Ace
        
            //CLUBS CARDS:
            for(let i = 2; i <= 9; i++)
            {
                let card = {id: x++, num: i, suit: 'C'};
                deck.push(card);
            }
            deck.push({id: x++, num: '=', suit: 'C'});
            deck.push({id: x++, num: 'J', suit: 'C'});
            deck.push({id: x++, num: 'Q', suit: 'C'});
            deck.push({id: x++, num: 'K', suit: 'C'});
            deck.push({id: x++, num: 'A', suit: 'C'});
        
            //HEARTS CARDS:
            for(let i = 2; i <= 9; i++)
            {
                let card = {id: x++, num: i, suit: 'H'};
                deck.push(card);
            }
            deck.push({id: x++, num: '=', suit: 'H'});
            deck.push({id: x++, num: 'J', suit: 'H'});
            deck.push({id: x++, num: 'Q', suit: 'H'});
            deck.push({id: x++, num: 'K', suit: 'H'});
            deck.push({id: x++, num: 'A', suit: 'H'});
        
            //DIAMONDS CARDS:
            for(let i = 2; i <= 9; i++)
            {
                let card = {id: x++, num: i, suit: 'D'};
                deck.push(card);
            }
            deck.push({id: x++, num: '=', suit: 'D'});
            deck.push({id: x++, num: 'J', suit: 'D'});
            deck.push({id: x++, num: 'Q', suit: 'D'});
            deck.push({id: x++, num: 'K', suit: 'D'});
            deck.push({id: x++, num: 'A', suit: 'D'});
        }
        
    }

    function shuffle()
    {
        //shuffles deck
        console.log("Shuffling deck...");

        //map and sort randomly
        let shuffledDeck = deck
            .map(function(value) // pairs deck array with a new array of random values
            {
                return { value: value, sort: Math.random() }
            })
            .sort(function(a, b) // sorts this random array in ascending order, thus "shuffling" the original array
            {
                return a.sort - b.sort;
            })
            .map(function(item) // "extracts" the original array values from the new array
            {
                return item.value;
            });
        
        //overwrites deck with shuffled version of deck
        deck = shuffledDeck;
    }

    function dealCard(hand, x)
    {
        for(let i = 0; i < x; i++)
        {
            hand.push(deck.pop());
        }
        console.log(hand);
    }

    createDeck(2); // create deck
    shuffle(deck); // shuffle it
    dealCard(playerHand, 2); // deal cards to player
    dealCard(dealerHand, 2); // deal cards to dealer
    

  return (
    <div className="page">
        <CardContainer hand={dealerHand}/>
            <div className="tab-dealer">Dealer</div>
            <div className="gap" />
            <div className="tab-player">Player</div>
        <CardContainer hand={playerHand}/>
        <div />
        <Button onClick={() => dealCard(playerHand, 1)} className="button" variant="primary">Deal</Button>
    </div>
  )
}
