import React from 'react';
import './navigation.css';
import { Link } from 'react-router-dom';

export default function navigation() {
  return (
    <div className="navigation">
        <ul>
            <li>
                <Link to="/" className="new-font">How To Play</Link>
            </li>
            <li>
                <Link to="/game" className="new-font">Game</Link>
            </li>
            <li>
                <Link to="/scores" className="new-font">High Scores</Link>
            </li>
        </ul>
    </div>
  )
}
