import React, { useEffect, useState } from 'react';
import './pages.css';
import CardContainer from '../game components/card-container/card-container.jsx';
import Points from '../game components/points/points.jsx';
import CurrentScore from '../game components/current-score/current-score.jsx';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function Game() {

    //STATE HOOKS

    //hand states are arrays of card objects
    //setHand method can be used to change state
    //default state is empty array
    const [playerHand, setPlayerHand] = useState([]);
    const [dealerHand, setDealerHand] = useState([]);

    //deck state is array of card objects
    const [deck, setDeck] = useState([]);

    //point states are point totals of cards in each player's hands
    const [playerPoints, setPlayerPoints] = useState(0);
    const [dealerPoints, setDealerPoints] = useState(0);

    //total points is the combined total of all of the winning hands before the player lost
    const [totalPoints, setTotalPoints] = useState(0);

    //Bootstrap modal, state is bool: visible or hidden
    const [show, setShow] = useState(false);
    
    //EFFECT HOOKS

    //updates every render (since the dependency array listed afterwards is empty)
    useEffect(() => 
    { 
        createDeck(2); // create deck(s)
        dealCard(setPlayerHand, 2); // deal cards to player
        dealCard(setDealerHand, 1); // deal cards to dealer
    }, []);

    //updates whenever playerHand changes
    useEffect(() =>
    {
        //set playerPoints to equal the total value of playerHand
        let newTotal = calcHandValue(playerHand)
        setPlayerPoints(newTotal);

        //check if player loses
        if(newTotal > 21)
        {
            //show game over modal after delay so player can see they lost
            setTimeout(() => { handleShow(); }, 700);
        }

    }, [playerHand]);

    //updates whenever dealerHand updates
    useEffect(() =>
    {
        //set dealerPoints to equal the total value of dealerHand
        let newTotal = calcHandValue(dealerHand)
        setDealerPoints(newTotal);

        //check if dealer loses
        if(newTotal > 21)
        {
            console.log("YOU WIN");
        }

    }, [dealerHand]);

    //handle bootstrap Modal
    function handleShow()
    {
        setShow(true);
    }
    
    function handleClose()
    {
        setShow(false);
    }

    //BLACKJACK COMPUTATION:

    //create deck
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
            newDeck.push({id: x++, num: 'A', value: 1, suit: 'S'}); // Ace
        
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
            newDeck.push({id: x++, num: 'A', value: 1, suit: 'C'});
        
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
            newDeck.push({id: x++, num: 'A', value: 1, suit: 'H'});
        
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
            newDeck.push({id: x++, num: 'A', value: 1, suit: 'D'});
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
    }

    //deal cards
    function dealCard(setHand, x)
    {
        setDeck(prevDeck => {
            const dealtCards = prevDeck.slice(-x);
            setHand(prevHand => [...prevHand, ...dealtCards]);
            return prevDeck.slice(0, -x);
        });
    }    

    //calculate total value of cards in given hand
    function calcHandValue(hand)
    {
        let total = 0;
        let aceCount = 0;
        hand.forEach(function(card)
        {
            //accommodate for aces being 11 or 1
            if(card.num == 'A')
            {
                //ace is worth 11 by default
                total += 11;

                //keep track of aces in hand
                aceCount++;
            }
            else
            {
                //all other cards are worth their normal value
                total += card.value;
            }
        });

        //if player would go over 21 but an ace is in the hand, 
        while (total > 21 && aceCount > 0)
        {
            //reduce points by 10 for each ace putting total over 21 (thus setting their value to 1)
            total -= 10;
            aceCount--;
        }
        return total;
    }

    //player clicks "hit"
    function hit()
    {
        dealCard(setPlayerHand, 1)
    }

    //player clicks "stay" (dealer's AI takes over)
    function stay()
    {
        dealCard(setDealerHand, 1)
    }

  return (
    <div className="page">
        <CurrentScore score=""/>
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
            <Button onClick={hit} className="button" variant="outline-light" size="lg">Hit</Button>
            <Button onClick={stay} className="button" variant="outline-light" size="lg">Stay</Button>
        </div>

        {/* Modals */}
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Game Over!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                asdfasdfasdf
            </Modal.Body>
        </Modal>
    </div>
  )
}
