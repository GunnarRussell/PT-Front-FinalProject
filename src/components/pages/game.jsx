import React, { useEffect, useState, useRef } from 'react';

import './pages.css';

//IMPORT CUSTOM COMPONENTS
import CardContainer from '../game components/card-container/card-container.jsx';
import Points from '../game components/points/points.jsx';
import InfoBar from '../game components/info-bar/info-bar.jsx';
import ScoreContainer from '../high score components/score-container/score-container.jsx';

//IMPORT BOOTSTRAP COMPONENTS
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function Game() {

    //CONSTANTS
    const startingLives = 5;
    const numberOfDecks = 3;

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

    //uses a ref to store the latest value of dealerPoints for use in rapid-fire calculations when the dealer AI deals cards to itself (the internet told me to)
    const dealerPointsRef = useRef(dealerPoints);

    //total points is the combined total of all of the winning hands before the player lost
    const [totalPoints, setTotalPoints] = useState(0);

    //lives, starts at 5 and lowers every time you lose
    const [lives, setLives] = useState(startingLives);

    //disable/enable buttons to prevent button spam
    const [buttonDisabled, setButtonDisabled] = useState(false);

    //Bootstrap modals, state is bool: visible or hidden
    //Game Over message
    const [showGameOver, setShowGameOver] = useState(false);

    //Win/Lose message
    const [showResult, setShowResult] = useState(false);
    const [result, setResult] = useState("");

    //Score Table
    const[showScoreTable, setShowScoreTable] = useState(false);
    
    
    //EFFECT HOOKS

    //updates every render (since the dependency array listed afterwards is empty)
    useEffect(() => 
    { 
        //empty both hands, create deck, shuffle it, deal cards
        newGame();
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
            setTimeout(() => { 
                handleResultShow("BUST"); 
                //close result after delay
                setTimeout(() => { 
                  handleResultClose();

                  //lose a life
                  let newLives = lives - 1;
                  setLives(newLives);

                  //start new round
                  newGame();
                }, 800);
            }, 800);
            
        }


    }, [playerHand]);

    //updates whenever dealerHand updates
    useEffect(() =>
    {
        //set dealerPoints to equal the total value of dealerHand
        let newTotal = calcHandValue(dealerHand)
        setDealerPoints(newTotal);

        //DO NOT PUT WHILE LOOP IN EFFECT HOOK, APPARENTLY

    }, [dealerHand]);

    //updates dealerPointsRef whenever dealerPoints changes (more dealer AI stuff)
    useEffect(() =>
    {
        dealerPointsRef.current = dealerPoints;
    }, [dealerPoints]);

    //updates whenever lives changes
    useEffect(() =>
    {
        //If 0 lives, game over
        if (lives < 1)
        {
            handleGameOverShow();
        }
    }, [lives]);

    //HANDLE MODALS

    //Game Over show
    function handleGameOverShow()
    {
        setShowGameOver(true);
    }
    
    //Game Over - retry button
    function handleGameOverRetry()
    {
        setShowGameOver(false);
        setTotalPoints(0);
        setLives(startingLives);
        newGame();
    }

    //Game Over - close
    function handleGameOverScores()
    {
        setShowGameOver(false);

        //show high score table after small delay to account for animation
        setTimeout(() =>
        { 
            setShowScoreTable(true);
        }, 300);

    }

    //WIN, LOSE, or DRAW, shows result of round
    function handleResultShow(newResult)
    {
        setShowResult(true);
        setResult(newResult);
    }

    function handleResultClose()
    {
        setShowResult(false);
        setButtonDisabled(false);
    }

    //High Score Table
    function handleScoreTableClose()
    {
        setShowScoreTable(false);

        //start new game
        setTotalPoints(0);
        setLives(startingLives);
        newGame();
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
    
    //start new game
    function newGame()
    {
        setPlayerHand([]);
        setDealerHand([]);
        createDeck(numberOfDecks); // create deck(s)
        dealCard(setPlayerHand, 2); // deal cards to player
        dealCard(setDealerHand, 1); // deal cards to dealer
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
        setButtonDisabled(true);
        setTimeout(() => { setButtonDisabled(false); }, 800);
        dealCard(setPlayerHand, 1)
    }

    //player clicks "stay" (dealer's AI takes over)
    function stay()
    {
        setButtonDisabled(true);
        //keep dealing cards to dealer until they have at least 17 points
        const interval = setInterval(() =>
        {
            if (dealerPointsRef.current < 17)
            {
                //dealer stays on 17 or higher, deal card otherwise
                dealCard(setDealerHand, 1);
            }
            else
            {
                //once total is 17 or higher:
                clearInterval(interval);

                //determine who wins
                console.log(`player: ${playerPoints} dealer: ${dealerPointsRef.current}`);
                if(playerPoints > dealerPointsRef.current || dealerPointsRef.current > 21)
                {
                    //if player has more points or if dealer busts

                    //show "YOU WIN" for a half second
                    setTimeout(() => { }, 800);
                    handleResultShow("WIN!");
                    setTimeout(() => { handleResultClose(); }, 800);

                    //add points to total score
                    setTotalPoints(totalPoints + playerPoints)
                }
                else if(playerPoints < dealerPointsRef.current && dealerPointsRef.current < 22)
                {
                    //if player has less points than dealer and dealer didn't bust

                    //show "YOU LOSE" for a half second
                    setTimeout(() => { }, 800);
                    handleResultShow("LOSE");
                    setTimeout(() => {              handleResultClose();
                        //lose a life
                        let newLives = lives - 1;
                        setLives(newLives);
                     }, 800);

                }
                else
                {
                    //if both player and dealer tie

                    //show "YOU TIE" for a half second
                    setTimeout(() => { }, 800);
                    handleResultShow("PUSH");
                    setTimeout(() => { handleResultClose(); }, 800);
                }

                //start new round
                setTimeout(() => { newGame(); }, 800);
                
            }
        }, 800);

        

    }

  return (
    <div className="page">
        {/* Info Bar */}
        <InfoBar lives={lives} totalPoints={totalPoints} />
        
        {/* Dealer's Hand */}
        <CardContainer hand={dealerHand}/>
            {/* Dealer's Name */}
            <div className="right tab-dealer">
                Dealer
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
            <Button 
                onClick={hit}
                className="button" 
                variant="outline-light" 
                size="lg"
                disabled={buttonDisabled}
            >
                Hit
            </Button>
            <Button 
                onClick={stay} 
                className="button" 
                variant="outline-light" 
                size="lg"
                disabled={buttonDisabled}
            >
                Stay
            </Button>
        </div>

        {/* Modals */}

        {/* Game Over Modal */}
        <Modal
            show={showGameOver}
            onHide={handleGameOverRetry}
            backdrop="static"
            centered
        >
            <Modal.Header>
                <Modal.Title>Game Over!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Your final score was {totalPoints}. Try again?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleGameOverScores}>Submit Score</Button>
                <Button variant="danger" onClick={handleGameOverRetry}>Retry</Button>
            </Modal.Footer>
        </Modal>

        {/* Win/Lose/Tie/Bust Modal */}
        <Modal
            show={showResult}
            onHide={handleResultClose}
            backdrop="static"
            centered
            className="result-modal"
        >
            {result}
        </Modal>

        {/* Submit Score Modal */}
        <Modal
            show={showScoreTable}
            onHide={handleScoreTableClose}
            backdrop="static"
            className="score-modal"
            centered
        >
            <ScoreContainer
                score={totalPoints} 
                handleScoreTableClose={handleScoreTableClose}
            />
        </Modal>
    </div>
  )
}
