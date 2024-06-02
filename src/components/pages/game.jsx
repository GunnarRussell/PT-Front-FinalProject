import React, { useEffect, useState } from 'react';
import './pages.css';
import CardContainer from '../card-container/card-container';
import Points from '../points/points.jsx';
import Button from 'react-bootstrap/Button';

export default function Game() {

    //STATE HOOKS
    //states are arrays of card objects
    //setHand method can be used to change state
    //default state is empty array
    const [playerHand, setPlayerHand] = useState([]);
    const [dealerHand, setDealerHand] = useState([]);
    const [deck, setDeck] = useState([]);
    const [playerPoints, setPlayerPoints] = useState(10);
    const [dealerPoints, setDealerPoints] = useState(10);
    
    //EFFECT HOOK
    //updates every render (since the dependency array listed afterwards is empty)
    useEffect(() => 
    { 
        createDeck(2); // create deck
        dealCard(setPlayerHand, 2); // deal cards to player
        dealCard(setDealerHand, 2); // deal cards to dealer
    }, []);

    //updates whenever playerHand changes
    useEffect(() =>
    {
        //set playerPoints to equal the total value of playerHand
        setPlayerPoints(calcHandValue(playerHand));
    }, [playerHand]);

    useEffect(() =>
    {
        //set dealerPoints to equal the total value of dealerHand
        setDealerPoints(calcHandValue(dealerHand));
    }, [dealerHand]);

    function createDeck(times)
    {
        console.log("Creating deck...")

        let x = 1;
        let newDeck = [];

        //create card objects for each card in a poker deck, add it to deck array

        for (let i = 0; i < times; i++)
        {
            //SPADES CARDS:
            for(let i = 2; i <= 9; i++)
            {
                // 2 through 9
                let card = {id: x++, num: i, value: i, suit: 'S'};
                newDeck.push(card);

            }
            newDeck.push({id: x++, num: '=', value: 10, suit: 'S'}); // 10 (in the card font, '=' displays a single-character '10')
            newDeck.push({id: x++, num: 'J', value: 10, suit: 'S'}); // Jack
            newDeck.push({id: x++, num: 'Q', value: 10, suit: 'S'}); // Queen
            newDeck.push({id: x++, num: 'K', value: 10, suit: 'S'}); // King
            newDeck.push({id: x++, num: 'A', value: 11, suit: 'S'}); // Ace
        
            //CLUBS CARDS:
            for(let i = 2; i <= 9; i++)
            {
                let card = {id: x++, num: i, value: i, suit: 'C'};
                newDeck.push(card);
            }
            newDeck.push({id: x++, num: '=', value: 10, suit: 'C'});
            newDeck.push({id: x++, num: 'J', value: 10, suit: 'C'});
            newDeck.push({id: x++, num: 'Q', value: 10, suit: 'C'});
            newDeck.push({id: x++, num: 'K', value: 10, suit: 'C'});
            newDeck.push({id: x++, num: 'A', value: 11, suit: 'C'});
        
            //HEARTS CARDS:
            for(let i = 2; i <= 9; i++)
            {
                let card = {id: x++, num: i, value: i, suit: 'H'};
                newDeck.push(card);
            }
            newDeck.push({id: x++, num: '=', value: 10, suit: 'H'});
            newDeck.push({id: x++, num: 'J', value: 10, suit: 'H'});
            newDeck.push({id: x++, num: 'Q', value: 10, suit: 'H'});
            newDeck.push({id: x++, num: 'K', value: 10, suit: 'H'});
            newDeck.push({id: x++, num: 'A', value: 11, suit: 'H'});
        
            //DIAMONDS CARDS:
            for(let i = 2; i <= 9; i++)
            {
                let card = {id: x++, num: i, value: i, suit: 'D'};
                newDeck.push(card);
            }
            newDeck.push({id: x++, num: '=', value: 10, suit: 'D'});
            newDeck.push({id: x++, num: 'J', value: 10, suit: 'D'});
            newDeck.push({id: x++, num: 'Q', value: 10, suit: 'D'});
            newDeck.push({id: x++, num: 'K', value: 10, suit: 'D'});
            newDeck.push({id: x++, num: 'A', value: 11, suit: 'D'});
        }
        
        //Shuffle deck
        console.log("Shuffling deck...");

        //map and sort randomly
        let shuffledDeck = newDeck
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
        
        //set deck state with shuffled version of deck
        setDeck(shuffledDeck);
        console.log(shuffledDeck);
    }

    function dealCard(setHand, x)
    {
        setDeck(prevDeck => {
            const dealtCards = prevDeck.slice(-x);
            setHand(prevHand => [...prevHand, ...dealtCards]);
            return prevDeck.slice(0, -x);
        });
    }    

    function calcHandValue(hand)
    {
        let total = 0;
        hand.forEach(function(card)
        {
            total += card.value;
        });
        console.log(total);
        return total;
    }

  return (
    <div className="page">
        <CardContainer hand={dealerHand}/>
            <div className="right">
                <div className="tab-dealer">
                    Dealer
                </div>
            </div>
            
            <div className="points-container">
                <Points points={playerPoints} />
                    vs.
                <Points points={dealerPoints} />
            </div>
            <div className="left">
                <div className="tab-player">
                    Player
                </div>
            </div>
            
        <CardContainer hand={playerHand}/>
        <div>
            <Button onClick={() => dealCard(setPlayerHand, 1)} className="button" variant="outline-light" size="lg">Hit</Button>
            <Button onClick={() => dealCard(setPlayerHand, 1)} className="button" variant="outline-light" size="lg">Stay</Button>
        </div>
    </div>
  )
}
